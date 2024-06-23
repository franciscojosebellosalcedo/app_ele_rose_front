import { useSelector } from "react-redux";
import "./OrderDetails.css";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getOrderByIDAndByUser } from "../../../../service/order";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../components/loader/Loader";
import { ROUTES } from "../../../../constants/constants";
import { formatDate, getAllAmountPoductsOrder } from "../../../../helpers/helpers";

const OrderDetails = () => {
    const accessToken = useSelector((state) => state.user.data.accessToken);
    const [isLoader, setIsLoader] = useState(false);
    const params = useParams();
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();

    const getOneOrder = async (idOrder) => {
        setIsLoader(true);
        if (accessToken) {
            try {
                const responseRequest = await getOrderByIDAndByUser(accessToken, idOrder);
                if (responseRequest.status === 200 && responseRequest.response) {
                    const data = responseRequest.data;
                    if (data) {
                        setOrder(data);
                    }
                } else {
                    navigate(`/${ROUTES.DASHBOARD}/${ROUTES.ORDER}`);
                }
            } catch (error) {
                toast.error("Error en servidor");
            }
        }
        setIsLoader(false);
    }

    useEffect(() => {
        if (params.id) {
            getOneOrder(params.id);
        }
    }, []);

    return (
        <>
            {
                isLoader ? <Loader /> :
                    <section className="container">
                        <i onClick={() => navigate(`/${ROUTES.DASHBOARD}/${ROUTES.ORDER}`)} className="uil uil-arrow-left icon_back_section"></i>
                        <h1 className="container_title">Detalles del pedido</h1>
                        {
                            order ?
                                <>
                                    <div className="container_details">
                                        <p className="title_data_order">Nombre de cliente: <span>{order?.user?.name}</span></p>
                                        <p className="title_data_order">Número de pedido: <span>{order?.num}</span></p>
                                        <p className="title_data_order">Cantidad de productos: <span>{getAllAmountPoductsOrder(order?.listProducts)}</span></p>
                                        <p className="title_data_order">Estado: <span className={`textStatusOrder ${order?.statusOrder === "Pending" ? "color_orange" : order?.statusOrder === "In process" ? "color_blue" : order?.statusOrder === "Sent" ? "color_pink" : order?.statusOrder === "Finalized" ? "color_green" : order?.statusOrder === "Canceled" ? "color_red" : ""}`}>{order?.statusOrder === "Pending" ? "Pendiente" : order?.statusOrder === "In process" ? "En proceso" : order?.statusOrder === "Sent" ? "Enviado" : order?.statusOrder === "Finalized" ? "Finalizado" : order?.statusOrder === "Canceled" ? "Cancelado" : ""}</span></p>
                                        <p className="title_data_order">Fecha: <span>{formatDate(order?.createdAt)}</span></p>
                                        <p className="title_data_order">Total: <span>$ {order?.total}</span></p>
                                    </div>
                                    <table className="table_details">
                                        <thead>
                                            <tr>
                                                <th scope="col">Producto</th>
                                                <th scope="col">Precio</th>
                                                <th scope="col">Cantidad</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                order?.listProducts && order?.listProducts.length > 0 ?
                                                    <>
                                                        {
                                                            order.listProducts.map((item, index) => {
                                                                return <tr key={index}>
                                                                    <td>
                                                                        <div className="content_product_table">
                                                                            <img className="imagen_product_cart" src={item.product.imagen} alt="" />
                                                                            <p className="name_product_cart">{item.product.name}</p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        $ {item.product.pricePromotion > 0 ? item.product.pricePromotion : item.product.realPrice}
                                                                    </td>
                                                                    <td>
                                                                        {item.amount}
                                                                    </td>
                                                                    <td>
                                                                        $ {item.product.pricePromotion > 0 ? item.product.pricePromotion * item.amount : item.product.realPrice * item.amount}
                                                                    </td>
                                                                </tr>
                                                            })
                                                        }
                                                    </>
                                                    : ""
                                            }

                                        </tbody>
                                    </table>
                                </> : ""
                        }
                    </section>
            }

        </>
    )
}

export default OrderDetails;