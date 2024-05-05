import { ROUTES } from "../../../../constants/constants";
import Filter from "../filter/Filter";
import ItemProduct from "../item/ItemProduct";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { setProductsFound } from "../../../../features/product/productSlice";
import Loader from "../../../../components/loader/Loader";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.data.list);
  const productsFound = useSelector((state) => state.product.data.productsFound);
  const isLoaderProducts = useSelector((state) => state.sectionActive.data.isLoaderProducts);

  const [valueSearch, setValueSearch] = useState("");

  const searchProduct = (value) => {
    setValueSearch(value);
    const productsFound = products.filter((p) => p.name.trim().toLowerCase().includes(value.trim().toLowerCase()) && p.category !==null);
    dispatch(setProductsFound(productsFound));
  }

  const clearProductsFound = () => {
    dispatch(setProductsFound([]));
    setValueSearch("");
  }

  const goTo = (url) => {
    navigate(url);
  }

  useEffect(() => {
    dispatch(setProductsFound([]));
  }, [])

  return (
    <section className="container">
      <h1 className="container_title">Productos</h1>
      {
        isLoaderProducts === true ? <Loader /> :
          <>
            <button onClick={() => goTo(`${ROUTES.CREATE_PRODUCT}`)} className="btn btn_new_product">Crear producto</button>
            <button onClick={() => goTo(`${ROUTES.NO_CATEGORIES_PRODUCTS}`)} className="btn btn_porduct_empty_categorie">Pr. sin categorías</button>
            <form className="form_search">
              <input onInput={(e) => searchProduct(e.target.value)} defaultValue={valueSearch} type="search" className="input_search" placeholder="Buscar producto" />
            </form>
            <Filter isEmptyCategory={false} />
            <div className="list_products">

              {
                productsFound && productsFound.length > 0 ?
                  <>
                    {
                      productsFound.map((product, index) => (
                        product.status=== true ? product.category !== null ? <ItemProduct key={index} product={product} clearProductsFound={clearProductsFound} />:"":""
                      ))
                    }
                  </> :
                  products && products.length > 0 ?
                    <>
                      {
                        products.map((product, index) => (
                          product.status=== true ? product.category !== null ? <ItemProduct key={index} product={product} clearProductsFound={clearProductsFound} />:"":""
                        ))
                      }
                    </> : ""
              }

            </div>
          </>
      }
    </section>
  )
}

export default Products;