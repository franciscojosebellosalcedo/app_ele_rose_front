import { useDispatch, useSelector } from "react-redux";
import "./ItemCollection.css";

const ItemCollectionSlider = ({ collection, setValueSearch,addItemSlider }) => {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.user.data.accessToken);

    return (
        <div className="grid_item grid_item_collection" onClick={(e)=>addItemSlider(e,collection)}>
            <h3 className="item_name">{collection?.name}</h3>
            <img className="imagen_category_card" src={collection?.imagen} alt="imagen collection" />
            {
                collection?.isAssociatedSlider=== true ? <img className="icon_item_selected_slider_collection" src={require("../../../../assest/icon-item-selected-slider.png")} alt="icon item selected slider" /> : ""
            }
        </div>
    )
}

export default ItemCollectionSlider;