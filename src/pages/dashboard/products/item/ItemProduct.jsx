import "./ItemProduct.css";
import { useSelector,useDispatch } from "react-redux";
import { removeOneProduct } from "../../../../features/product/productSlice";
import { deleteOneProducts } from "../../../../service/product";
import {  toast} from "sonner";
import { useState } from "react";
import Loader from "../../../../components/loader/Loader";

const ItemProduct = ({product,setValueSearch}) => {
  const dispatch=useDispatch();
  const accessToken=useSelector((state)=>state.user.data.accessToken);
  const [openConfirm,setOpenConfirm]=useState(false);
  const [isLoader,setIsloader]=useState(false);

  const deleteProduct=async (e,product)=>{
    e.preventDefault();
    setIsloader(true);
    try {
      if (accessToken) {
        if (!openConfirm) {
            toast(`¿ Desea eliminar la categoría ${product.name} ?`, {
                action: {
                    label: "Si",
                    onClick: async () => {
                        const responseDeleted = await deleteOneProducts(accessToken, product._id);
                        if (responseDeleted.status === 200 && responseDeleted.response) {
                          console.log(responseDeleted);
                            dispatch(removeOneProduct(product._id));
                            setValueSearch("");
                            toast.success(responseDeleted.message);
                        } else {
                            toast.error(responseDeleted.message);
                        }
                        setOpenConfirm(false);
                    }
                },
                cancel: {
                    label: "No",
                    onClick: () => {
                        setOpenConfirm(false);
                    }
                },
                onAutoClose:()=>{
                    setOpenConfirm(false);
                },
                onDismiss:()=>{
                    setOpenConfirm(false);
                }
            })
            setOpenConfirm(true);
        }

    }
    } catch (error) {
      toast.error("Se produjo un error al eliminar el producto");
    }
    setIsloader(false);
  }

  return (
    <div className="item_grid_product">
      {
        product.isNow===true ? <div className="title_now_product">
        <img src={require("../../../../assest/icon-new-product.png")} alt="" />
      </div>:""
      }
      <img className="item_image" src={product?.imagen} alt="imagen producto" />
      <div className="info_item">
        <p className="text_info">Nombre: <span>{product?.name}</span></p>
        <p className="text_info">Precio unidad: $ <span>{product?.realPrice}</span></p>
        <p className="text_info">Cantidad: <span>3</span></p>
        <section className="actions_card">
          <button className="btn btn_card btn_edit">Editar</button>
          <button onClick={(e)=>deleteProduct(e,product)} className="btn btn_card btn_delete">Eliminar</button>
          <button className="btn btn_card btn_new">Es nuevo</button>
        </section>
      </div>
      {
        isLoader===true ? <Loader/>:""
      }
    </div>
  )
}

export default ItemProduct