import { ROUTES } from "../../../../constants/constants";
import Filter from "../filter/Filter";
import ItemProduct from "../item/ItemProduct";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.data.list);
  const [valueSearch, setValueSearch] = useState("");
  const [isLoader, setIsloader] = useState(false);

  const goTo = (url) => {
    navigate(url);
  }

  useEffect(() => {
    if (products) {
      if (products.length === 0) {
        setIsloader(true);
      } else {
        setIsloader(false);
      }
    }
  });

  return (
    <section className="container">
      <h1 className="container_title">Productos</h1>
      <button onClick={() => goTo(`${ROUTES.CREATE_PRODUCT}`)} className="btn btn_new_product">Crear producto</button>
      <form className="form_search">
        <input type="search" className="input_search" placeholder="Buscar producto" />
      </form>
      <Filter />
        {
          isLoader === true ? <>
            <div className="container_text_loader">
              <p>Cargando tus productos 🥰 ...</p>
              <p>Asegurate de tener productos creados 😚</p>
            </div>
          </> : ""
        }
      <div className="list_products">

        {
          products && products.length > 0 ?
            <>
              {
                products.map((product, index) => (
                  <ItemProduct key={index} product={product} setValueSearch={setValueSearch} />
                ))
              }
            </> : ""
        }

        {/* {
          messageUser === true ? "Parece que no tienes productos creados" : ""
        } */}
      </div>
    </section>
  )
}

export default Products;