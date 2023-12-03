import "./ItemCategory.css";
import { useDispatch ,useSelector} from "react-redux";
import { toast } from "sonner";
import { deleteCategory } from "../../../../service/category";
import { removeCategory } from "../../../../feacture/categories/categoriesSlice";
import {  useNavigate} from "react-router-dom";
import { ROUTES } from "../../../../constants/constants";

const ItemCategory = ({category}) => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const accessToken=useSelector((state)=>state.user.data.accessToken);

    const deleteOneCategory=async (e,id)=>{
        e.preventDefault();
        try {
            if(accessToken){
                const responseDeleted=await deleteCategory(accessToken,id);
                if(responseDeleted.status===200 && responseDeleted.response){
                    toast.success(responseDeleted.message);      
                    dispatch(removeCategory(id));
                }else{
                    toast.error(responseDeleted.message);      
                }
            }
        } catch (error) {
            toast.error("Error al eliminar la categoría");      
        }
    }
    return (
        <div className="grid_item">
            <h3 className="item_name">{category?.name}</h3>
            <button onClick={()=>navigate(`${ROUTES.EDIT_CATEGORY}/${category?._id}`)} className="btn_category btn_edit_category"><i className="uil uil-pen"></i> Editar</button>
            <button onClick={(e)=>deleteOneCategory(e,category?._id)} className="btn_category btn_delete_category"><i className="uil uil-trash-alt"></i> Eliminar</button>
        </div>
    )
}

export default ItemCategory;