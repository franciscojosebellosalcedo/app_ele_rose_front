import NavBar from "../navBar/NavBar";
import "./Layaut.css";
import { Outlet} from "react-router-dom";
import { toast } from "sonner";
import { getAllCategories } from "../../service/category";
import { setAllCategories} from "../../features/category/categorySlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../loader/Loader";
import { getAllProducts } from "../../service/product";
import { setAllProducts } from "../../features/product/productSlice";
import { setListCollection } from "../../features/collection/collection";
import { setLoaderCategories,setLoaderProducts,setLoaderCollections, setLoaderItemsSlider } from "../../features/sectionActive/sectionActiveSlice";
import { getAllCollection } from "../../service/collection";
import { getAllItemSlider } from "../../service/itemSlider";
import { setAllItemsSlider } from "../../features/itemSlider/itemSliderSlice";

const Layaut = () => {
  const dispatch = useDispatch();
  const isLoader=useSelector((state)=>state.sectionActive.data.loader);
  const accessToken = useSelector((state) => state.user.data.accessToken);

  const getItemsSlider=async()=>{
    dispatch(setLoaderItemsSlider(true));
    try {
      if (accessToken) {
        const responseGetAll = await getAllItemSlider(accessToken);
        if (responseGetAll.status === 200 && responseGetAll.response) {
          const data = responseGetAll.data;
          dispatch(setAllItemsSlider(data));
        } else {
          toast.error(responseGetAll.message);
        }
      }
    } catch (error) {
      toast.error("Se produjo un error al obtener los productos");
    }
    dispatch(setLoaderItemsSlider(false));
  }

  const getProducts=async()=>{
    dispatch(setLoaderProducts(true));
    try {
      if (accessToken) {
        const responseGetAll = await getAllProducts(accessToken);
        if (responseGetAll.status === 200 && responseGetAll.response) {
          const data = responseGetAll.data;
          dispatch(setAllProducts(data));
        } else {
          toast.error(responseGetAll.message);
        }
      }
    } catch (error) {
      toast.error("Se produjo un error al obtener los productos");
    }
    dispatch(setLoaderProducts(false));
  }

  const getCollections = async () => {
    dispatch(setLoaderCollections(true));
    try {
      if (accessToken) {
        const responseGetAll = await getAllCollection(accessToken);
        if (responseGetAll.status === 200 && responseGetAll.response) {
          const data = responseGetAll.data;
          dispatch(setListCollection(data));
        } else {
          toast.error(responseGetAll.message);
        }
      }
    } catch (error) {
      toast.error("Se produjo un error al obtener las colecciones");
    }
    dispatch(setLoaderCollections(false));
  }

  const getCategories = async () => {
    dispatch(setLoaderCategories(true));
    try {
      if (accessToken) {
        const responseGetAll = await getAllCategories(accessToken);
        if (responseGetAll.status === 200 && responseGetAll.response) {
          const data = responseGetAll.data;
          dispatch(setAllCategories(data));
        } else {
          toast.error(responseGetAll.message);
        }
      }
    } catch (error) {
      toast.error("Se produjo un error al obtener las categorías");
    }
    dispatch(setLoaderCategories(false));
  }

  const loadModules=()=>{
    getCategories();
    getCollections();
    getProducts();
    getItemsSlider();
  }

  useEffect(() => {
    loadModules();
  }, []);

  return (
    <section className='layaut'>
      <NavBar/>
      {
        isLoader === true ? <Loader/>:<Outlet/>
      }
    </section>
  )
}

export default Layaut;