import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Loader from "../../../../components/loader/Loader";
import { ROUTES } from "../../../../constants/constants";
import { setOrder } from "../../../../features/order/orderSlice";
import { setProduct } from "../../../../features/product/productSlice";
import { handlerIsOpenListStatusOrder } from "../../../../features/sectionActive/sectionActiveSlice";
import { formatDate } from '../../../../helpers/helpers';
import { changeStatusOrder } from "../../../../service/order";
import "./ItemOrder.css";

const ItemOrder = ({ order, index }) => {
    const listStatus = useSelector((state) => state.sectionActive.data.listStatusOrder);
    const products= useSelector((state) => state.product.data.list);
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.user.data.accessToken);
    const [isLoader,setIsLoader]=useState(false);
    const navigate=useNavigate();

    const handlerOpenListStatus = (e) => {
        e.stopPropagation();
        dispatch(handlerIsOpenListStatusOrder(index));
    }

    const decrementAmountProduct = (statusOrder, list)=>{
        let lisProducts=[];
        products.map((pro)=>lisProducts.push({product:{...pro}}));
        if(statusOrder==="In process"){ 
            for (let index = 0; index < list.length; index++) {
                const itemList = list[index];
                const indexProduct= lisProducts.findIndex((item)=> item.product._id===itemList.product._id);
                const itemFound= lisProducts.find((item)=> item.product._id===itemList.product._id);
                if(indexProduct !== -1 && itemFound.product && itemFound.product.amount >= itemList.amount){
                    lisProducts[indexProduct].product.amount= itemFound.product.amount - itemList.amount;
                    dispatch(setProduct({index:indexProduct, product: lisProducts[indexProduct].product}));
                }
            }
        }
    }

    const changeStatus = async (statusOrder) => {
        setIsLoader(true);
        try {
            if (accessToken) {
                const responseRequest = await changeStatusOrder(accessToken, statusOrder, order._id);
                if (responseRequest.status === 200 && responseRequest.response) {
                    dispatch(setOrder({ index, order: responseRequest.data }));
                    decrementAmountProduct(statusOrder,responseRequest.data.listProducts);
                    toast.success(responseRequest.message);
                }
            }
        } catch (error) {
            toast.error("Error en el servidor");
        }
        setIsLoader(false);
    }
    return (
        <>
        {
            isLoader ? <Loader/>:""
        }
            <tr onClick={()=>navigate(`${ROUTES.ORDER_DETAILS}/${order._id}`)} key={order._id}>
                <td>
                    {order?.user?.name}
                </td>
                <td>
                    {order?.num}
                </td>
                <td>
                    $ {order?.total}
                </td>
                <td>
                    <p className={`textStatusOrder ${order?.statusOrder === "Pending" ? "color_orange" : order?.statusOrder === "In process" ? "color_blue" : order?.statusOrder === "Sent" ? "color_pink" : order?.statusOrder === "Finalized" ? "color_green" : order?.statusOrder === "Canceled" ? "color_red" : ""}`}>{order?.statusOrder === "Pending" ? "Pendiente" : order?.statusOrder === "In process" ? "En proceso" : order?.statusOrder === "Sent" ? "Enviado" : order?.statusOrder === "Finalized" ? "Finalizado" : order?.statusOrder === "Canceled" ? "Cancelado" : ""}</p>
                </td>
                <td>
                    {formatDate(order?.createdAt)}
                </td>
                <td>
                    <button onClick={(e) => handlerOpenListStatus(e)} className=" btn_list_status_order">
                        C. Estado
                        {
                            listStatus[index]?.isOpen ?
                                <ul className="list_status">
                                    <li onClick={(e) => changeStatus("Pending")} className="textStatusOrder color_orange">Pendiente</li>
                                    <li onClick={(e) => changeStatus("In process")} className="textStatusOrder color_blue">En proceso</li>
                                    <li onClick={(e) => changeStatus("Sent")} className="textStatusOrder color_pink">Enviado</li>
                                    <li onClick={(e) => changeStatus("Finalized")} className="textStatusOrder color_green">Finalizado</li>
                                    <li onClick={(e) => changeStatus("Canceled")} className="textStatusOrder color_red">Cancelado</li>
                                </ul>
                                : ""
                        }
                    </button>
                </td>
            </tr>
        </>
    )
}

export default ItemOrder;