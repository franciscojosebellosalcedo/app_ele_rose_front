import { useEffect, useState } from "react";
import "./EditCategory.css";
import {  useNavigate,useParams} from "react-router-dom";
import { ROUTES } from "../../../../constants/constants";
import {useDispatch, useSelector  } from "react-redux";
import { toast} from "sonner";
import { editCategory  } from "../../../../feacture/categories/categoriesSlice";
import { getOneCategory, updateCategory } from "../../../../service/category";

const EditCategory = () => {
  const [newDataCategory,setNewDataCategory]=useState({name:""});
  const categories=useSelector((state)=>state.categories.data.list);
  const accessToken=useSelector((state)=>state.user.data.accessToken);
  const navigate=useNavigate();
  const params=useParams();
  const dispatch=useDispatch();
  const [category,setCategory]=useState({});

  const handelerFormCategory=(target,value)=>{
    setNewDataCategory({...newDataCategory,[target]:value});
  }

  const updateCategorie=async (e)=>{
    e.preventDefault();
    try {
      const filterCat=categories.filter((cat)=>cat._id !== category._id);
      const categoryFound=filterCat.find((cate)=>cate.name.toLowerCase().includes(newDataCategory.name.toLocaleLowerCase()));
      if(categoryFound){
        toast.warning("Esta categoría ya existe");
      }else{
        const responseUpdated=await updateCategory(accessToken,category._id,newDataCategory);
        if(responseUpdated.status===200 && responseUpdated.response){
          dispatch(editCategory(responseUpdated.data));
          navigate(`/${ROUTES.DASHBOARD}/${ROUTES.CATEGORIES}`);
          toast.success(responseUpdated.message);
        }
      }
    } catch (error) {
      toast.error("Error al editar esta categoría");
    }
  }

  const getOneCategorie=async (id)=>{
    try {
      if(accessToken){
        const responseFindOneCategory=await getOneCategory(accessToken,id);
        if(responseFindOneCategory.status===200 && responseFindOneCategory.response){
          const data=responseFindOneCategory.data;
          setCategory(data);
          setNewDataCategory({name:data?.name});
        }else{
          navigate(`/${ROUTES.DASHBOARD}/${ROUTES.CATEGORIES}`);
        }
      }
    } catch (error) {
      toast.error("Error al obtener esta categoría");
    }
  }

  useEffect(() => {
    getOneCategorie(params.id);
  }, []);
  
  
  return (
    <section className="container">
    <i  onClick={()=>navigate(`/${ROUTES.DASHBOARD}/${ROUTES.CATEGORIES}`)} className="uil uil-arrow-left icon_back_section"></i>
    <h1 className="container_title">Editar categoría</h1>
    <form className="form_category form_create_category">
      <section className="form_section">
        <label htmlFor="name_category">Nombre:</label>
        <input onInput={(e)=>handelerFormCategory("name",e.target.value)} defaultValue={newDataCategory?.name}  className="input_form_category" type="text" placeholder="Ingrese el nombre de la categoria" id="name_category" />
      </section>
      <button onClick={(e)=>updateCategorie(e)} className="btn btn_create_category">Guardar</button>
    </form>
  </section>
  )
}

export default EditCategory;