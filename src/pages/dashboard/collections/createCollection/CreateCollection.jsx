import { useState } from "react";
import { ROUTES } from "../../../../constants/constants";
import "./CreateCollection.css";
import { useNavigate } from "react-router-dom";
import { convertToBase64 } from "../../../../helpers/helpers";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { createCollection } from "../../../../service/collection";
import Loader from "../../../../components/loader/Loader";
import { addCollection } from "../../../../features/collection/collection";

const CreateCollection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoader, setIsLoader] = useState(false);
  const [collection, setCollection] = useState({ name: "", imagen: "" });
  const [imagen, setImagen] = useState("");
  const accesToken = useSelector((state) => state.user.data.accessToken);

  const handlerFormCollection = async (target, value) => {
    if (target === "imagen") {
      const base64 = await convertToBase64(value);
      setImagen(base64);
      setCollection({ ...collection, imagen: base64 });
    } else {
      setCollection({ ...collection, name: value });
    }
  }

  const validate = () => {
    return collection.name === "" || collection.imagen === "";
  }


  const createNewCollection = async (e) => {
    e.preventDefault();
    setIsLoader(true);
    try {
      if (accesToken) {
        if (validate()) {
          toast.warning("Llene los campos por favor");
        } else {
          const responseCreateCollection = await createCollection(accesToken, collection);
          if(responseCreateCollection.response){
            const data=responseCreateCollection.data;
            dispatch(addCollection(data));
            setCollection({name:"",imagen:""});
            setImagen("");
            toast.success(responseCreateCollection.message);
          }else{
            toast.error(responseCreateCollection.message);
          }
        }
      }
    } catch (error) {
      toast.error("Error en el servidor");
    }
    setIsLoader(false);
  }

  return (
    <section className="container">
      {isLoader===true ? <Loader/> :""}
      <i onClick={() => navigate(`/${ROUTES.DASHBOARD}/${ROUTES.COLLECTIONS}`)} className="uil uil-arrow-left icon_back_section"></i>
      <h1 className="container_title">Nueva colección</h1>
      <form className="form_category form_create_category">
        <section className="form_section">
          <label htmlFor="name_collection">Nombre:</label>
          <input onInput={(e) => handlerFormCollection("name", e.target.value)} value={collection?.name} className="input_form_category" type="text" placeholder="Ingrese el nombre de la colección" id="name_collection" />
        </section>
        <section className="form_section form_section_input_file">
          <label htmlFor="imagen_collection">Imagen:</label>
          <label htmlFor="imagen_collection" className="label_input_image_category">Seleccionar imagen</label>
          <input onInput={(e) => handlerFormCollection("imagen", e.target.files)} accept="image/*" className="input_form_category input_file_category" type="file" id="imagen_collection" />
        </section>
        {imagen && <img src={imagen} className="imagen_new_category" alt="imagen category" />}
      </form>
      <button onClick={(e)=>createNewCollection(e)} className="btn btn_create_category">Guardar</button>
    </section>
  )
}

export default CreateCollection;