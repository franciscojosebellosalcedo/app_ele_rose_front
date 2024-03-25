import React, { useEffect, useState } from 'react'
import { optionsFilterOrders } from '../../../../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setOrdersFound } from '../../../../features/order/orderSlice';

const FilterOrders = ({valueInputSearch,setValue}) => {
  const [openOptions, setOpenOptions] = useState(false);
  const [optionSelected,setOptionSelected]=useState(null);
  const orders=useSelector((state)=>state.order.data.list);
  const dispatch=useDispatch();

  const handlerSelectedOption = (option) => {
    console.log(option)
    if(option && option.value){
      setOptionSelected(option.name);
      const dataFilter=orders.filter((order)=>order.statusOrder===option.value);
      dispatch(setOrdersFound(dataFilter));
      setValue("");
    }else{
      setOptionSelected(null);
      dispatch(setOrdersFound([]));
    }
    handlerOpenOptionsFilterOrders();
  }

  const handlerOpenOptionsFilterOrders = () => {
    setOpenOptions(!openOptions);
  }

  return (
    <section className="filter">
      <div className="filter_option">
        <div className="container_title_filter" onClick={() => handlerOpenOptionsFilterOrders()}>
          <i className="uil uil-filter icon_filter"></i> {optionSelected ? optionSelected :"Filtrar por"}
        </div>
        {
          openOptions === true ? <div className="options_filter">
            {
              optionsFilterOrders.map((option, index) => (
                <div onClick={()=>handlerSelectedOption(option)} key={index} className="item_option">{option.name}</div>
              ))
            }
          </div> : ""
        }
      </div>
    </section>
  )
}

export default FilterOrders;