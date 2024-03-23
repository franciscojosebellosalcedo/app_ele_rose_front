import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PUBLIC_KEY_UPLOADCARE, ROUTES } from "../../../../constants/constants";
import { pushCategory } from "../../../../features/category/categorySlice";
import { createCategory } from "../../../../service/category";
import "./CreateCategory.css";
import { Widget } from '@uploadcare/react-widget';
import Loader from "../../../../components/loader/Loader";
import { addImagen } from "../../../../features/uploadcare/uploadcare";


const CreateNewCategory = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", imagen: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.user.data.accessToken);
  const [imagenUploadcare, setImagenSelectedUploadcare] = useState(null);


  const handelerFormCategory = async (target, value) => {
    if (target == "imagen") {
      setNewCategory({ ...newCategory, [target]: value });
    } else {
      setNewCategory({ ...newCategory, [target]: value });
    }
  }

  const validate = () => {
    return newCategory.name === "" || newCategory.imagen === "";
  }

  const saveCategory = async (e) => {
    e.preventDefault();
    setIsLoader(true);
    try {
      if (accessToken) {
        if (validate()) {
          toast.warning("LLene los campo por favor");
        } else {
          const responseCreate = await createCategory(accessToken, newCategory);
          if (responseCreate.status === 200 && responseCreate.response) {
            const data = responseCreate.data;
            dispatch(pushCategory(data));
            setNewCategory({ name: "", imagen: "" });
            toast.success(responseCreate.message);
            dispatch(addImagen({ name: imagenUploadcare.name, url: imagenUploadcare.originalUrl, uuid: imagenUploadcare.uuid }));
          } else {
            toast.warning(responseCreate.message);
          }
        }
      }
    } catch (error) {
      toast.error("Se produjo un error al guardar la categoría");
    }
    setIsLoader(false);
  }

  return (
    <section className="container">

      {
        isLoader === true ? <Loader /> :
          <>
            <i onClick={() => navigate(`/${ROUTES.DASHBOARD}/${ROUTES.CATEGORIES}`)} className="uil uil-arrow-left icon_back_section"></i>
            <h1 className="container_title">Nueva categoría</h1>
            <form className="form_category form_create_category">
              <section className="form_section">
                <label htmlFor="name_category">Nombre:</label>
                <input value={newCategory.name} onInput={(e) => handelerFormCategory("name", e.target.value)} className="input_form_category" type="text" placeholder="Ingrese el nombre de la categoria" id="name_category" />
              </section>
              <section className="form_section form_section_input_file">
                <label htmlFor="imagen_category">Imagen:</label>
                <Widget
                  publicKey={PUBLIC_KEY_UPLOADCARE}
                  onChange={async (file) => {
                    setImagenSelectedUploadcare(file);
                    handelerFormCategory("imagen", file.originalUrl);
                  }}
                />
              </section>
              {imagenUploadcare && <img className="imagen_new_category" src={imagenUploadcare.originalUrl} alt="imagen category" />}
            </form>
            <button onClick={(e) => saveCategory(e)} className="btn btn_create_category">Guardar</button>
          </>
      }
    </section>
  )
}

export default CreateNewCategory;