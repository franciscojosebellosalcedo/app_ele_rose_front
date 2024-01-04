import "./AddItemSlider.css";
import { useNavigate } from "react-router-dom";
import { ROUTES, typeElementSlider } from "../../../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "sonner";
import ContentProductSlider from "../../../../components/contentProductSlider/ContentProductSlider";
import { addItemSlider } from "../../../../service/itemSlider";
import Loader from "../../../../components/loader/Loader";
import { setProductIsAssociatedSlider } from "../../../../features/product/productSlice";
import { setCollectionIsAssociatedSlider } from "../../../../features/collection/collection";

const AddItemSlider = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSelectType, setOpenSelectType] = useState(false);
  const [nameTypeSelected, setNameTypeSelected] = useState(null);
  const [item, setItem] = useState({ type: "", valueItem: "" });
  const [isLoader, setIsLoader] = useState(false);
  const accessToken = useSelector((state) => state.user.data.accessToken);


  const handlerOpenSelectTypeItem = () => {
    setOpenSelectType(!openSelectType);
  }

  const handlerItem = (target, value) => {
    setItem({ ...item, [target]: value });
  }
  const handlerNameOptionType = (value) => {
    handlerItem("type", value);
    setNameTypeSelected(value);
    handlerOpenSelectTypeItem();
  }

  const addOneItemSlider = async (e, data) => {
    e.preventDefault();
    setIsLoader(true);
    item.valueItem=data._id;
    try {
      if (accessToken) {
        const responseItemSlider = await addItemSlider(accessToken, item);
        if(responseItemSlider.status===200 && responseItemSlider.response){
          const data=responseItemSlider.data;
          if(data.type===typeElementSlider[0]){
            dispatch(setProductIsAssociatedSlider(data));
          }else if(data.type===typeElementSlider[1]){
            dispatch(setCollectionIsAssociatedSlider(data));
          }
          toast.success(responseItemSlider.message);
        }else{
          toast.warning(responseItemSlider.message);
        }
      }
    } catch (error) {
      toast.error("Se produjo un error");
    }
    setIsLoader(false);
  }


  return (
    <section className="container">
      <i onClick={() => navigate(`/${ROUTES.DASHBOARD}/${ROUTES.SLIDER}`)} className="uil uil-arrow-left icon_back_section"></i>
      <h1 className="container_title">Nuevo elemento slider</h1>

      <div className="container_input type_item_input">
        <label className="label_form_product" htmlFor="category">Tipo de elemento</label>
        <section className="filter ">
          <div className="filter_option input_select_category">
            <div className="container_title_filter" onClick={() => handlerOpenSelectTypeItem()}  >
              <i className="uil uil-apps icon_menu_item"></i> {nameTypeSelected !== null ? nameTypeSelected : "Elije..."}
            </div>
            {
              openSelectType === true ? <div className="options_filter_operator">
                {
                  typeElementSlider && typeElementSlider.length > 0 ? typeElementSlider.map((type, index) => (
                    <div onClick={() => handlerNameOptionType(type)} key={index} className="item_option">{type}</div>
                  )) : ""
                }
              </div> : ""
            }
          </div>
        </section>
      </div>

      {
        isLoader === true ? <Loader /> : ""
      }

      {
        nameTypeSelected === typeElementSlider[0] ? <ContentProductSlider addOneItemSlider={addOneItemSlider} /> : ""
      }

    </section>
  )
}

export default AddItemSlider