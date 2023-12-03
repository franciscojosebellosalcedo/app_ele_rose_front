import "./Categories.css";
import { useNavigate } from "react-router-dom";
import ItemCategory from "../itemCategory/ItemCategory";
import { ROUTES } from "../../../../constants/constants";
import { useSelector, useDispatch } from "react-redux";
import { setCategories } from "../../../../feacture/categories/categoriesSlice";
import { useEffect } from "react";
import { getAllCategories } from "../../../../service/category";
import { useState } from "react";
import Loader from "../../../../components/loader/Loader";
import { toast } from "sonner";

const Categories = () => {
  const navigate = useNavigate();
  const [isLoader, setIsLoader] = useState(false);
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.data.accessToken);
  const categories = useSelector((state) => state.categories.data.list);
  const [valueSearch, setValueSearch] = useState("");
  const [categoriesFound, setCategoriesFound] = useState([]);

  const goTo = (url) => {
    navigate(url, { replace: true, relative: true });
  }

  const handlerFormSearch = (value) => {
    setValueSearch(value);
  }

  const getCategories = async () => {
    setIsLoader(true)
    try {
      if (accessToken) {
        const responseGetAll = await getAllCategories(accessToken);
        if (responseGetAll.status === 200 && responseGetAll.response) {
          const data = responseGetAll.data;
          dispatch(setCategories(data));
        } else {
          toast.error(responseGetAll.message);
        }
      }
    } catch (error) {
      toast.error("Se produjo un error al obtener las categorías");
    }
    setIsLoader(false);

  }

  const findCategoriesSearch = () => {
    const filter = categories.filter((cat) => cat.name.toLowerCase().includes(valueSearch));
    setCategoriesFound([...filter]);
  }

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    findCategoriesSearch();
  }, [valueSearch]);

  return (
    <>
      {
        isLoader === true ? <Loader /> :
          <section className="container">
            <h1 className="container_title">Categorías</h1>
            <button onClick={() => goTo(`${ROUTES.CREATE_CATEGORY}`)} className="btn btn_new_category">Crear categoría</button>
            <form className="form_search">
              <input onInput={(e) => handlerFormSearch(e.target.value)} value={valueSearch} type="search" className="input_search" placeholder="Buscar categoría" />
            </form>
            <div className="list_categories_grid">
              {
                valueSearch !=="" && categoriesFound.length===0 ? 
                  <>
                    <p>No se encontraron datos</p>
                  </>
                :
                categoriesFound && categoriesFound.length > 0 ?
                  <>
                    {
                      categoriesFound.map((cat, index) => (
                        <ItemCategory key={index} category={cat} />
                      ))
                    }
                  </>
                  :
                  categories && categories.length > 0 ?
                    <>
                      {
                        categories.map((cat, index) => (
                          <ItemCategory key={index} category={cat} />
                        ))
                      }
                    </>
                    : ""
              }
            </div>
          </section>
      }
    </>
  )
}

export default Categories;