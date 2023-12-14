import "./ItemProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { editProduct, removeOneProduct } from "../../../../features/product/productSlice";
import { setOpenFormProduct } from "../../../../features/sectionActive/sectionActiveSlice.js";
import { deleteOneProducts, updateProduct } from "../../../../service/product";
import { toast } from "sonner";
import { useState } from "react";
import Loader from "../../../../components/loader/Loader";
import FormProduct from "../../../../components/formProduct/FormProduct";

const ItemProduct = ({ product, clearProductsFound }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.data.accessToken);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isLoader, setIsloader] = useState(false);
  const [productoSelected, setProductSelected] = useState(null);

  const deleteProduct = async (e, product) => {
    e.preventDefault();
    e.stopPropagation()
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
                  dispatch(removeOneProduct(product._id));
                  clearProductsFound();
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
      toast.error("Se produjo un error al eliminar el producto");
    }
    setIsloader(false);
  }

  const handlerOpenForm = (value) => {
    dispatch(setOpenFormProduct());
    setProductSelected(value);
  }

  const updateProductById = async (e, product, body) => {
    e.preventDefault();
    e.stopPropagation();
    setIsloader(true);
    try {
      if (accessToken) {
        const responseUpdate = await updateProduct(accessToken, product._id, body);
        if (responseUpdate.status === 200 && responseUpdate.response) {
          const dataResponse = responseUpdate.data;
          dispatch(editProduct(dataResponse));
          toast.success(responseUpdate.message);
        } else {
          toast.error(responseUpdate.message);
        }
      }
    } catch (error) {
      toast.error("Se produjo un error");
    }
    setIsloader(false);
  }

  const handlerSelectProduct = (product) => {
    setProductSelected(product);
    dispatch(setOpenFormProduct());
  }

  return (
    <>
      <div className="item_grid_product" onClick={() => handlerSelectProduct(product)}>
        {
          product.isNow === true ? <div className="title_now_product">
            <img src={require("../../../../assest/icon-new-product.png")} alt="" />
          </div> : ""
        }
        {
          product.percentage && product.percentage >0  === true ? <div className="text_percentage">
           <p>{`${product.percentage}%`}</p>
          </div> : ""
        }
        <img className="item_image" src={product?.imagen} alt="imagen producto" />
        <div className="info_item">
          <p className="text_info">Nombre: <span>{product?.name}</span></p>
          <p className="text_info">Precio unidad: $ <span>{product?.realPrice}</span></p>
          <p className="text_info">Precio descuento: <span>{product?.pricePromotion > 0 ? `$ ${product?.pricePromotion}` : "No aplica"}</span></p>
          <p className="text_info">Cantidad: <span>{product?.amount}</span></p>
          <p className="text_info">Categoría: <span>{product?.category?.name}</span></p>
          <section className="actions_card">
            <button onClick={(e) => deleteProduct(e, product)} className="btn btn_card btn_delete">Anular</button>
            <button onClick={(e) => updateProductById(e, product, { isNow: !product.isNow })} className="btn btn_card btn_new">{product.isNow === true ? "Cambiar a anterior" : "Cambiar a nuevo"}</button>
          </section>
        </div>
        {
          isLoader === true ? <Loader /> : ""
        }
      </div>
      {
        productoSelected !== null ? <FormProduct fnHandlerOpenForm={handlerOpenForm} productSeleted={productoSelected} /> : ""
      }
    </>
  )
}

export default ItemProduct