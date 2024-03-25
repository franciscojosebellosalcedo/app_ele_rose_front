import React, { useEffect, useState } from 'react'
import FilterOrders from '../filter/FilterOrders';
import TableOrders from '../tableOrder/TableOrders';
import { useDispatch, useSelector } from 'react-redux';
import { setOrdersFound } from '../../../../features/order/orderSlice';

const Orders = () => {
    const orders=useSelector((state)=>state.order.data.list);
    const dispatch=useDispatch();
    const [value,setValue]=useState("");


    const searchOrder=(value)=>{
        setValue(value);
        const ordersFound=orders.filter((order)=>order.user.name.trim().toLowerCase().includes(value.trim().toLowerCase()));
        dispatch(setOrdersFound([...ordersFound]));
    }
    return (
        <section className='container'>
            <h1 className="container_title">Pedidos</h1>
            <br />
            <form className="form_search">
                <input value={value} onInput={(e)=>searchOrder(e.currentTarget.value)}  type="search" className="input_search" placeholder="Buscar pedido por nombre de cliente" />
            </form>
            <FilterOrders valueInputSearch={value} setValue={setValue}/>
            <TableOrders/>
        </section>
    )
}

export default Orders;