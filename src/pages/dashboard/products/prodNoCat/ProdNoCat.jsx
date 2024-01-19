import { useDispatch, useSelector } from "react-redux";
import { setProductsFound } from "../../../../features/product/productSlice";
import { useEffect, useState } from "react";
import Filter from "../filter/Filter";
import ItemProduct from "../item/ItemProduct";
import Loader from "../../../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/constants";
import FilterProdNoCat from "../filter/FilterProdNoCat";

const ProdNoCat = () => {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.data.list);
    const productsFound = useSelector((state) => state.product.data.productsFound);
    const [valueSearch, setValueSearch] = useState("");
    const isLoaderProducts = useSelector((state) => state.sectionActive.data.isLoaderProducts);


    const searchProduct = (value) => {
        setValueSearch(value);
        const productsFound = products.filter((p) => p.name.trim().toLowerCase().includes(value.trim().toLowerCase()) && p.category === null);
        dispatch(setProductsFound(productsFound));
    }
    const clearProductsFound = () => {
        dispatch(setProductsFound([]));
        setValueSearch("");
    }

    useEffect(()=>{
        dispatch(setProductsFound([]));
    },[])

    return (
        <section className="container">
            <h1 className="container_title">Productos sin categorías</h1>
            <i onClick={() => navigate(`/${ROUTES.DASHBOARD}/${ROUTES.PRODUCTS}`)} className="uil uil-arrow-left icon_back_section"></i>

            {
                isLoaderProducts === true ? <Loader /> :
                    <>
                        <form className="form_search ">
                            <input onInput={(e) => searchProduct(e.target.value)} defaultValue={valueSearch} type="search" className="input_search form_search_product_no_category" placeholder="Buscar producto" />
                        </form>
                        <FilterProdNoCat />
                        <div className="list_products">

                            {
                                productsFound && productsFound.length > 0 ?
                                    <>
                                        {
                                            productsFound.map((product, index) => (
                                                product.category === null ? <ItemProduct key={index} product={product} clearProductsFound={clearProductsFound} /> : ""
                                            ))
                                        }
                                    </> :
                                    products && products.length > 0 ?
                                        <>
                                            {
                                                products.map((product, index) => (
                                                    product.category === null ? <ItemProduct key={index} product={product} clearProductsFound={clearProductsFound} /> : ""
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

export default ProdNoCat;