import NavBar from "../navBar/NavBar";
import "./Layaut.css";
import { Outlet} from "react-router-dom";
import { toast } from "sonner";
import { getAllCategories } from "../../service/category";
import { setAllCategories} from "../../features/category/categorySlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../loader/Loader";

const Layaut = () => {
  const dispatch = useDispatch();
  const [isLoader, setIsLoader] = useState(false);
  const accessToken = useSelector((state) => state.user.data.accessToken);


  const getCategories = async () => {

    setIsLoader(true)
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
    setIsLoader(false);
  }

  useEffect(() => {
    getCategories();
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