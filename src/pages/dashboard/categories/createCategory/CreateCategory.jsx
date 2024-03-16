import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateCategory.css";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { createCategory } from "../../../../service/category";
import { ROUTES } from "../../../../constants/constants";
import { pushCategory } from "../../../../features/category/categorySlice";
// import { convertToBase64 } from "../../../../helpers/helpers";
import Loader from "../../../../components/loader/Loader";
import { Widget } from '@uploadcare/react-widget';


const CreateNewCategory = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", imagen: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imagenSelected, setImagenSelected] = useState("");
  const accessToken = useSelector((state) => state.user.data.accessToken);

  const handelerFormCategory = async (target, value) => {
    if (target == "imagen") {
      setNewCategory({ ...newCategory, [target]: value });
      setImagenSelected(value);
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
        }else{
          const responseCreate = await createCategory(accessToken, newCategory);
          if (responseCreate.status === 200 && responseCreate.response) {
            const data = responseCreate.data;
            dispatch(pushCategory(data));
            setImagenSelected("");
            setNewCategory({ name: "", imagen: "" });
            toast.success(responseCreate.message);
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
                  publicKey="56c704ce776c0acebcfd"
                  onChange={(file) => handelerFormCategory("imagen", file.originalUrl)}
                />
              </section>
              {imagenSelected && <img className="imagen_new_category" src={imagenSelected} alt="imagen category" />}
            </form>
            <button onClick={(e) => saveCategory(e)} className="btn btn_create_category">Guardar</button>
          </>
      }
    </section>
  )
}

export default CreateNewCategory;