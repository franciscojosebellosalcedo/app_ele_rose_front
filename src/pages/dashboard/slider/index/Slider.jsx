import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../components/loader/Loader";
import { ROUTES, typeElementSlider } from "../../../../constants/constants";
import { removeItemSlider } from "../../../../service/itemSlider";
import ItemSlider from "../item/ItemSlider";
import "./Slider.css";
import { removeOneItemElementSlider } from "../../../../features/itemSlider/itemSliderSlice";
import { setProductIsAssociatedSlider } from "../../../../features/product/productSlice";
import { setCollectionIsAssociatedSlider } from "../../../../features/collection/collection";
import { toast } from "sonner";

const Slider = () => {
  const user = useSelector((state) => state.user.data.user);
  const accessToken = useSelector((state) => state.user.data.accessToken);
  const itemsSlider = useSelector((state) => state.itemSlider.data.list);
  const isLoaderItemsSlider = useSelector((state) => state.sectionActive.data.isLoaderItemsSlider);
  const [isLoader, setIsLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openConfirm, setOpenConfirm] = useState(false);

  const removeOneItemSlider = async (e, id) => {
    e.preventDefault();
    try {
      if (accessToken) {
        if (!openConfirm) {
          toast(`¿ Desea eliminar este elemento del carrusel de tu pagina web ?`, {
            action: {
              label: "Si",
              onClick: async () => {
                setIsLoader(true);
                const responseRemoveItenSlider = await removeItemSlider(accessToken, id);
                if (responseRemoveItenSlider.status == 200 && responseRemoveItenSlider.response) {
                  const data = responseRemoveItenSlider.data;
                  dispatch(removeOneItemElementSlider(data._id));
                  if (data.type === typeElementSlider[0]) {
                    dispatch(setProductIsAssociatedSlider(data.valueItem));
                  } else if (data.type === typeElementSlider[1]) {
                    dispatch(setCollectionIsAssociatedSlider(data.valueItem));
                  }
                  toast.success(responseRemoveItenSlider.message);
                } else if (responseRemoveItenSlider.status == 300 && responseRemoveItenSlider.response) {
                  toast.warning(responseRemoveItenSlider.message);
                }
                setIsLoader(false);
                setOpenConfirm(false);
              }
            },
            cancel: {
              label: "No",
              onClick: () => {
                setOpenConfirm(false);
              }
            },
            onAutoClose: () => {
              setOpenConfirm(false);
            },
            onDismiss: () => {
              setOpenConfirm(false);
            }
          })
          setOpenConfirm(true);
        }
      }
    } catch (error) {
      toast.error("Se produjo un error");
    }
  }

  return (
    <section className="container">
      {
        isLoader === true ? <Loader /> : ""
      }
      <h1 className="container_title">Carrusel</h1>
      {
        isLoaderItemsSlider === true ? <Loader /> :
          <>
            <button className="btn btn_new_category" onClick={() => navigate(ROUTES.ADD_ELEMENT_SLIDER)}>Agregar elemento</button>
            <p className="text_slider_container">{user?.name} Aquí podrás asociar maximo tres productos al carrusel de tu pagina web 😚</p>
            <h3 className="subtitle_slider">Elementos agregados</h3>
            <h3 className="subtitle_slider">Colecciones: {itemsSlider.filter((item) => item.type === "Colección").length}</h3>
            <h3 className="subtitle_slider">Productos: {itemsSlider.filter((item) => item.type === "Producto").length}</h3>
            <div className="list_products">
              {
                itemsSlider && itemsSlider.length > 0 ?
                  <>
                    {
                      itemsSlider.map((item, index) => (
                        <ItemSlider removeItemSlider={removeOneItemSlider} key={index} item={item} />
                      ))
                    }
                  </>
                  : ""
              }
            </div>
          </>
      }
    </section>
  )
}

export default Slider;