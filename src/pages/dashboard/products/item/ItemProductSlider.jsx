import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../components/loader/Loader";
import "./ItemProduct.css";

const ItemProductSlider = ({ product, clearProductsFound,addItemSlider }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.data.accessToken);

  return (
    <>
      <div className="item_grid_product" onClick={(e)=>addItemSlider(e,product)} >
        {
          product.isNow === true ? <div className="title_now_product">
            <img src={require("../../../../assest/icon-new-product.png")} alt="" />
          </div> : ""
        }
        {
          product.percentage && product.percentage >0 ? <div className="text_percentage">
           <p>{`${product.percentage}%`}</p>
          </div> : ""
        }
        <img className="item_image" src={product?.imagen} alt="imagen producto" />
        {
         product?.isAssociatedSlider=== true ? <img className="icon_item_selected_slider" src={require("../../../../assest/icon-item-selected-slider.png")} alt="icon item selected slider" />:""

        }
        <div className="info_item">
          <p className="text_info">Nombre: <span>{product?.name}</span></p>
          <p className="text_info">Precio unidad: $ <span>{product?.realPrice}</span></p>
          <p className="text_info">Precio descuento: <span>{product?.pricePromotion > 0 ? `$ ${product?.pricePromotion}` : "No aplica"}</span></p>
          <p className="text_info">Cantidad: <span>{product?.amount}</span></p>
          <p className="text_info">Categoría: <span>{product?.category?.name ? product?.category?.name :"No aplica"}</span></p>
          <p className="text_info">Colección: <span>{product?.collection?.name ? product?.collection?.name:"No aplica"}</span></p>
        
        </div>
        
      </div>
    </>
  )
}

export default ItemProductSlider