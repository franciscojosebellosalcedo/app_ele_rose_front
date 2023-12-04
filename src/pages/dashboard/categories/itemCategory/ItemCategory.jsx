import "./ItemCategory.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { deleteCategory } from "../../../../service/category";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/constants";
import { useState } from "react";
import { removeCategorie } from "../../../../features/category/categorySlice";

const ItemCategory = ({ category,index }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openConfirm, setOpenConfirm] = useState(false);
    const accessToken = useSelector((state) => state.user.data.accessToken);

    const deleteOneCategory = async (e, category) => {
        e.preventDefault();
        try {
            if (accessToken) {
                if (!openConfirm) {
                    toast(`¿ Desea eliminar la categoría ${category.name} ?`, {
                        action: {
                            label: "Si",
                            onClick: async () => {
                                const responseDeleted = await deleteCategory(accessToken, category._id);
                                if (responseDeleted.status === 200 && responseDeleted.response) {
                                    dispatch(removeCategorie(category._id));
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
            toast.error("Error al eliminar la categoría");
        }
    }
    return (
        <div className="grid_item">
            <h3 className="item_name">{category?.name}</h3>
            <button onClick={() => navigate(`${ROUTES.EDIT_CATEGORY}/${category?._id}`)} className="btn_category btn_edit_category"><i className="uil uil-pen"></i> Editar</button>
            <button onClick={(e) => deleteOneCategory(e, category)} className="btn_category btn_delete_category"><i className="uil uil-trash-alt"></i> Eliminar</button>
        </div>
    )
}

export default ItemCategory;