import "./ItemCategory.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { deleteCategory } from "../../../../service/category";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/constants";
import { useState } from "react";
import { removeCategorie } from "../../../../features/category/categorySlice";
import { setAllProducts } from "../../../../features/product/productSlice";
import Loader from "../../../../components/loader/Loader";

const ItemCategory = ({ category,setValueSearch }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoader,setIsLoader]=useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const accessToken = useSelector((state) => state.user.data.accessToken);
    const products = useSelector((state) => state.product.data.list);
    const deleteOneCategory = async (e, category) => {
        e.preventDefault();
        try {
            if (accessToken) {
                if (!openConfirm) {
                    toast(`¿ Desea eliminar la categoría ${category.name} ?
                    \nTener en cuenta que si elimina esta categoría se 
                    eliminarán todos los productos relacionados a esta`, {
                        action: {
                            label: "Si",
                            onClick: async () => {
                                setIsLoader(true)
                                const responseDeleted = await deleteCategory(accessToken, category._id);
                                if (responseDeleted.status === 200 && responseDeleted.response) {
                                    dispatch(removeCategorie(category._id));
                                    const listProducts=products.filter((p)=>p.category._id !== category._id);
                                    dispatch(setAllProducts(listProducts));
                                    setValueSearch("");
                                    toast.success(responseDeleted.message);
                                } else {
                                    toast.error(responseDeleted.message);
                                }
                                setIsLoader(true)
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
            toast.error("Error al eliminar la categoría");
        }
    }
    return (
        <div className="grid_item">
            {
                isLoader=== true? <Loader/>:""
            }
            <h3 className="item_name">{category?.name}</h3>
            <img className="imagen_category_card" src={category?.imagen} alt="imagen category" />
            <button onClick={() => navigate(`${ROUTES.EDIT_CATEGORY}/${category?._id}`)} className="btn_category btn_edit_category"><i className="uil uil-pen"></i> Editar</button>
            <button onClick={(e) => deleteOneCategory(e, category)} className="btn_category btn_delete_category"><i className="uil uil-trash-alt"></i> Eliminar</button>
        </div>
    )
}

export default ItemCategory;