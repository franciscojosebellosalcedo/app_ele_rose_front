import { useState } from "react";
import "./EditCategory.css";
import {  useNavigate} from "react-router-dom";
import { ROUTES } from "../../../../constants/constants";

const EditCategory = () => {
  const [newDataCategory,setNewDataCategory]=useState({});
  const navigate=useNavigate();

  const handelerFormCategory=(target,value)=>{
    setNewDataCategory({...newDataCategory,[target]:value});
  }
  
  return (
    <section className="container">
    <i  onClick={()=>navigate(`/${ROUTES.DASHBOARD}/${ROUTES.CATEGORIES}`)} className="uil uil-arrow-left icon_back_section"></i>
    <h1 className="container_title">Editar categoría</h1>
    <form className="form_category form_create_category">
      <section className="form_section">
        <label htmlFor="name_category">Nombre:</label>
        <input onInput={(e)=>handelerFormCategory("name",e.target.value)} className="input_form_category" type="text" placeholder="Ingrese el nombre de la categoria" id="name_category" />
      </section>
      <button className="btn btn_create_category">Guardar</button>
    </form>
  </section>
  )
}

export default EditCategory;