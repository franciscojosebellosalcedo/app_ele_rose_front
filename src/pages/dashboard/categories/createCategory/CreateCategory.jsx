import { useState } from "react";
import {useNavigate  } from "react-router-dom";
import "./CreateCategory.css";
import {toast} from "sonner";
import {  useSelector,useDispatch} from "react-redux";
import { createCategory } from "../../../../service/category";
import { addCategorie } from "../../../../feacture/categories/categoriesSlice";
import { ROUTES } from "../../../../constants/constants";


const CreateNewCategory = () => {
  const [newCategory,setNewCategory]=useState({name:""});
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const accessToken = useSelector((state) => state.user.data.accessToken);

  const handelerFormCategory=(target,value)=>{
    setNewCategory({...newCategory,[target]:value});
  }

  const validate=()=>{
    return newCategory.name==="";
  }

  const saveCategory=async (e)=>{
    e.preventDefault();
    try {
      if(accessToken){
        if(validate()){
          toast.warning("LLene el campo por favor");
        }else{
          const responseCreate=await createCategory(accessToken,newCategory);
          if(responseCreate.status===200 && responseCreate.response){
            const data=responseCreate.data;
            dispatch(addCategorie(data));
            toast.success(responseCreate.message);
          }else{
            toast.warning(responseCreate.message);
          }

        }
      }
    } catch (error) {
      toast.error("Se produjo un error al guardar la categoría");
    }
  }

  return (
    <section className="container">
      <i  onClick={()=>navigate(`/${ROUTES.DASHBOARD}/${ROUTES.CATEGORIES}`)} className="uil uil-arrow-left icon_back_section"></i>
      <h1 className="container_title">Nueva categoría</h1>
      <form className="form_category form_create_category">
        <section className="form_section">
          <label htmlFor="name_category">Nombre:</label>
          <input value={newCategory.name} onInput={(e)=>handelerFormCategory("name",e.target.value)} className="input_form_category" type="text" placeholder="Ingrese el nombre de la categoria" id="name_category" />
        </section>
        <button onClick={(e)=>saveCategory(e)} className="btn btn_create_category">Guardar</button>
      </form>
    </section>
  )
}

export default CreateNewCategory;