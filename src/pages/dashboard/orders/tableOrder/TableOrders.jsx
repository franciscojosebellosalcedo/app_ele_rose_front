import { useSelector } from "react-redux";
import ItemOrder from "../itemOrder/ItemOrder";
import "./TableOrders.css";
const TableOrders = () => {
    const orders = useSelector((state) => state.order.data.list);
    const ordersFound = useSelector((state) => state.order.data.found);

    return (
        <table className="resp">
            <thead>
                <tr>
                    <th scope="col">Cliente</th>
                    <th scope="col">#Pedido</th>
                    <th scope="col">Total</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    ordersFound && ordersFound.length > 0 ?
                        <>
                            {
                                ordersFound.map((order, index) => {
                                    return <ItemOrder index={index} key={order._id} order={order} />
                                })
                            }
                        </>
                        :
                        <>
                            {
                                orders.map((order, index) => {
                                    return <ItemOrder index={index} key={order._id} order={order} />
                                })
                            }
                        </> 
                }
            </tbody>
        </table>
    )
}

export default TableOrders