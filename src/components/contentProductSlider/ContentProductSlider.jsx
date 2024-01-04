import { setProductsFound } from "../../features/product/productSlice";
import { useSelector, useDispatch } from "react-redux";
import ItemProductSlider from "../../pages/dashboard/products/item/ItemProductSlider";
import Filter from "../../pages/dashboard/products/filter/Filter";
import { useState } from "react";

const ContentProductSlider = (props) => {
    const dispatch=useDispatch();
    const [valueSearch,setValueSearch]=useState("");
    const productsFound = useSelector((state) => state.product.data.productsFound);
    const products = useSelector((state) => state.product.data.list);

    const searchProduct = (value) => {
        setValueSearch(value);
        const productsFound = products.filter((p) => p.name.trim().toLowerCase().includes(value.trim().toLowerCase()));
        dispatch(setProductsFound(productsFound));
    }

    return (
        <>
            <form className="form_search">
                <input onInput={(e) => searchProduct(e.target.value)} defaultValue={valueSearch} type="search" className="input_search" placeholder="Buscar producto" />
            </form>
            <Filter />
            <div className="list_products list_products_option_slider">

                {
                    productsFound && productsFound.length > 0 ?
                        <>
                            {
                                productsFound.map((product, index) => (
                                    <ItemProductSlider addItemSlider={props.addOneItemSlider} key={index} product={product} />
                                ))
                            }
                        </> :
                        products && products.length > 0 ?
                            <>
                                {
                                    products.map((product, index) => (
                                        <ItemProductSlider addItemSlider={props.addOneItemSlider} key={index} product={product} />
                                    ))
                                }
                            </> : ""
                }

            </div>
        </>
    )
}

export default ContentProductSlider;