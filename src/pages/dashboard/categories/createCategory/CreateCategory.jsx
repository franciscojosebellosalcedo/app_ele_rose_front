import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateCategory.css";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { createCategory } from "../../../../service/category";
import { ROUTES } from "../../../../constants/constants";
import { pushCategory } from "../../../../features/category/categorySlice";
import { convertToBase64 } from "../../../../helpers/helpers";


const CreateNewCategory = () => {
  const [newCategory, setNewCategory] = useState({ name: "" ,imagen:""});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imagenSelected,setImagenSelected]=useState("");
  const accessToken = useSelector((state) => state.user.data.accessToken);

  const handelerFormCategory =async (target, value) => {
    if(target=="imagen"){
      const base64Image=await convertToBase64(value);
      setImagenSelected(base64Image);
      setNewCategory({ ...newCategory, [target]: base64Image });
    }else{
      setNewCategory({ ...newCategory, [target]: value });
    }
  }

  const validate = () => {
    return newCategory.name === "" || newCategory.imagen === "";
  }

  const saveCategory = async (e) => {
    e.preventDefault();
    try {
      if (accessToken) {
        if (validate()) {
          toast.warning("LLene los campo por favor");
          return ;
        }
        const responseCreate = await createCategory(accessToken, newCategory);
        if (responseCreate.status === 200 && responseCreate.response) {
          const data = responseCreate.data;
          dispatch(pushCategory(data));
          setImagenSelected("");
          setNewCategory({ name: "",imagen:"" });
          toast.success(responseCreate.message);
        } else {
          toast.warning(responseCreate.message);
        }
      }
    } catch (error) {
      toast.error("Se produjo un error al guardar la categoría");
    }
  }

  return (
    <section className="container">
      <i onClick={() => navigate(`/${ROUTES.DASHBOARD}/${ROUTES.CATEGORIES}`)} className="uil uil-arrow-left icon_back_section"></i>
      <h1 className="container_title">Nueva categoría</h1>
      <form className="form_category form_create_category">
        <section className="form_section">
          <label htmlFor="name_category">Nombre:</label>
          <input value={newCategory.name} onInput={(e) => handelerFormCategory("name", e.target.value)} className="input_form_category" type="text" placeholder="Ingrese el nombre de la categoria" id="name_category" />
        </section>
        <section className="form_section form_section_input_file">
          <label htmlFor="imagen_category">Imagen:</label>
          <label htmlFor="imagen_category" className="label_input_image_category">Seleccionar imagen</label>
          <input onInput={(e) => handelerFormCategory("imagen", e.target.files)} accept="image/*"  className="input_form_category input_file_category" type="file" placeholder="Ingrese el nombre de la categoria" id="imagen_category" />
        </section>
        {imagenSelected && <img className="imagen_new_category" src={imagenSelected} alt="imagen category" />}
      </form>
        <button onClick={(e) => saveCategory(e)} className="btn btn_create_category">Guardar</button>
    </section>
  )
}

export default CreateNewCategory;