import { ROUTES } from "../../../../constants/constants";
import Filter from "../filter/Filter";
import ItemProduct from "../item/ItemProduct";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate  } from "react-router-dom";

const Products = () => {
  const accessToken = useSelector((state) => state.user.data.accessToken);
  const navigate=useNavigate();

  const goTo=(url)=>{
    navigate(url);
  }

  return (
    <section className="container">
      <h1 className="container_title">Productos</h1>
      <button onClick={()=>goTo(`${ROUTES.CREATE_PRODUCT}`)} className="btn btn_new_product">Crear producto</button>
      <form className="form_search">
        <input  type="search" className="input_search" placeholder="Buscar producto" />
      </form>
      <Filter/>
      <div className="list_products">
        <ItemProduct />
        <ItemProduct />
        <ItemProduct />
        <ItemProduct />
        <ItemProduct />
        <ItemProduct />
      </div>
    </section>
  )
}

export default Products;