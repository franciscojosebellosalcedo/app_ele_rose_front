import { useEffect, useState } from "react";
import "./EditCategory.css";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { getOneCategory, updateCategory } from "../../../../service/category";
import { editCategory } from "../../../../features/category/categorySlice";
import { convertToBase64 } from "../../../../helpers/helpers";
import Loader from "../../../../components/loader/Loader";
import { editCategoryProduct } from "../../../../features/product/productSlice";

const EditCategory = () => {
  const [newDataCategory, setNewDataCategory] = useState({ name: "", imagen: "" });
  const categories = useSelector((state) => state.category.data.list);
  const accessToken = useSelector((state) => state.user.data.accessToken);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState({});
  const [isLoader, setIsLoader] = useState(false);

  const handelerFormCategory = async (target, value) => {
    if (target == "imagen") {
      const base64Image = await convertToBase64(value);
      setNewDataCategory({ ...newDataCategory, [target]: base64Image });
    } else {
      setNewDataCategory({ ...newDataCategory, [target]: value });
    }

  }

  const updateCategorie = async (e) => {
    e.preventDefault();
    setIsLoader(true);
    try {
      const filterCat = categories.filter((cat) => cat._id !== category._id);
      const categoryFound = filterCat.find((cate) => cate.name.toLowerCase().includes(newDataCategory.name.toLocaleLowerCase()));
      if (newDataCategory.name === "") {
        toast.warning("Llene el campo por favor");
        return;
      }
      if (categoryFound) {
        toast.warning("Esta categoría ya existe");
      } else {
        const responseUpdated = await updateCategory(accessToken, category._id, newDataCategory);
        if (responseUpdated.status === 200 && responseUpdated.response) {
          const data = responseUpdated.data;
          dispatch(editCategoryProduct(data));
          dispatch(editCategory(data));
          navigate(`/${ROUTES.DASHBOARD}/${ROUTES.CATEGORIES}`);
          toast.success(responseUpdated.message);
        } else {
          toast.error(responseUpdated.message);
        }
      }
    } catch (error) {
      toast.error("Error al editar esta categoría");
    }
    setIsLoader(false);
  }

  const getOneCategorie = async (id) => {
    setIsLoader(true);
    try {
      if (accessToken) {
        const responseFindOneCategory = await getOneCategory(accessToken, id);
        if (responseFindOneCategory.status === 200 && responseFindOneCategory.response) {
          const data = responseFindOneCategory.data;
          setCategory(data);
          setNewDataCategory({ name: data?.name, imagen: data?.imagen });
        } else {
          navigate(`/${ROUTES.DASHBOARD}/${ROUTES.CATEGORIES}`);
        }
      }
    } catch (error) {
      toast.error("Error al obtener esta categoría");
    }
    setIsLoader(false);
  }

  useEffect(() => {
    getOneCategorie(params.id);
  }, []);


  return (
    <section className="container">
      {isLoader=== true ? <Loader/> :""}
      <i onClick={() => navigate(`/${ROUTES.DASHBOARD}/${ROUTES.CATEGORIES}`)} className="uil uil-arrow-left icon_back_section"></i>
      <h1 className="container_title">Editar categoría</h1>
      <form className="form_category form_create_category">
        <section className="form_section">
          <label htmlFor="name_category">Nombre:</label>
          <input onInput={(e) => handelerFormCategory("name", e.target.value)} defaultValue={newDataCategory?.name} className="input_form_category" type="text" placeholder="Ingrese el nombre de la categoria" id="name_category" />
        </section>
        <section className="form_section form_section_input_file">
          <label htmlFor="imagen_category">Imagen:</label>
          <label htmlFor="imagen_category" className="label_input_image_category">Seleccionar imagen</label>
          <input onInput={(e) => handelerFormCategory("imagen", e.target.files)} accept="image/*" className="input_form_category input_file_category" type="file" placeholder="Ingrese el nombre de la categoria" id="imagen_category" />
        </section>
        {newDataCategory?.imagen && <img className="imagen_new_category" src={newDataCategory?.imagen} alt="imagen category" />}
      </form>
      <button onClick={(e) => updateCategorie(e)} className="btn btn_create_category">Guardar</button>
    </section>
  )
}

export default EditCategory;