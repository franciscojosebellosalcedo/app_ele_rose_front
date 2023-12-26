import { deleteCollection } from "../../../../service/collection";
import "./ItemCollection.css";
import { toast } from "sonner";
import {useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteToListAndFoundsCollection } from "../../../../features/collection/collection";
import { ROUTES } from "../../../../constants/constants";

const ItemCollection = ({collection,setValueSearch}) => {
  const dispatch=useDispatch();
  const [isLoader,setIsLoader]=useState(false);
  const accessToken=useSelector((state)=>state.user.data.accessToken);
  const [openConfirm,setOpenConfirm]=useState(false);
  const navigate = useNavigate();

  const deleteOneCollection = async (e, collection) => {
    e.preventDefault();
    try {
        if (accessToken) {
            if (!openConfirm) {
                toast(`¿ Desea eliminar la colección ${collection.name} ?`, {
                    action: {
                        label: "Si",
                        onClick: async () => {
                          setIsLoader(true);
                            const responseDeleted = await deleteCollection(accessToken, collection._id);
                            if (responseDeleted.status === 200 && responseDeleted.response) {
                                dispatch(deleteToListAndFoundsCollection(collection._id));
                                setValueSearch("");
                                toast.success(responseDeleted.message);
                            } else {
                                toast.error(responseDeleted.message);
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
      <h3 className="item_name">{collection?.name}</h3>
      <img className="imagen_category_card" src={collection?.imagen} alt="imagen collection" />
      <button onClick={() => navigate(`${ROUTES.EDIT_COLLECTION}/${collection?._id}`)} className="btn_category btn_edit_category"><i className="uil uil-pen"></i> Editar</button>
      <button  onClick={(e)=>deleteOneCollection(e,collection)} className="btn_category btn_delete_category"><i className="uil uil-trash-alt"></i> Eliminar</button>
    </div>
  )
}

export default ItemCollection;