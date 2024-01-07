import "./ItemSlider.css";
import { typeElementSlider } from '../../../../constants/constants'

const ItemSlider = ({ item,removeItemSlider }) => {
    return (
        <>
            {
                item.type === typeElementSlider[0] ?
                    <>
                        <div className="item_grid_product item_itemSlider">
                            <i className="uil uil-multiply icon_delete_img" onClick={(e)=>removeItemSlider(e,item._id)}></i>

                            {
                                item.product.isNow === true ? <div className="title_now_product">
                                    <img src={require("../../../../assest/icon-new-product.png")} alt="" />
                                </div> : ""
                            }
                            {
                                item.product.percentage && item.product.percentage > 0 ? <div className="text_percentage">
                                    <p>{`${item.product.percentage}%`}</p>
                                </div> : ""
                            }
                            <img className="item_image" src={item.product?.imagen} alt="imagen producto" />
                            {
                                item.product?.isAssociatedSlider === true ? <img className="icon_item_selected_slider" src={require("../../../../assest/icon-item-selected-slider.png")} alt="icon item selected slider" /> : ""
                            }
                            <div className="info_item">
                                <p className="text_info">Nombre: <span>{item.product?.name}</span></p>
                                <p className="text_info">Precio unidad: $ <span>{item.product?.realPrice}</span></p>
                                <p className="text_info">Precio descuento: <span>{item.product?.pricePromotion > 0 ? `$ ${item.product?.pricePromotion}` : "No aplica"}</span></p>
                                <p className="text_info">Cantidad: <span>{item.product?.amount}</span></p>
                                <p className="text_info">Categoría: <span>{item.product?.category?.name ? item.product?.category?.name : "No aplica"}</span></p>
                                <p className="text_info">Colección: <span>{item.product?.collection?.name ? item.product?.collection?.name : "No aplica"}</span></p>
                            </div>
                        </div>
                    </>
                    :
                    <div className="grid_item grid_item_collection item_itemSlider"  >
                        <i className="uil uil-multiply icon_delete_img" onClick={(e)=>removeItemSlider(e,item._id)}></i>
                        <h3 className="item_name">{item.collection?.name}</h3>
                        <img className="imagen_category_card" src={item.collection?.imagen} alt="imagen collection" />
                        {
                            item.collection?.isAssociatedSlider === true ? <img className="icon_item_selected_slider_collection" src={require("../../../../assest/icon-item-selected-slider.png")} alt="icon item selected slider" /> : ""
                        }
                    </div>
            }
        </>
    )
}

export default ItemSlider