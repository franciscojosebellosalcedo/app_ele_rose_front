import { useState } from "react";
import { conditionals, optionsFilter } from "../../../../constants/constants";
import "./Filter.css";
import {  useSelector,useDispatch} from "react-redux";

const Filter = () => {
  const [openOptions, setOpenOptions] = useState(false);
  const [openValue, setOpenValueOperator] = useState(false);
  const [nameOperator, setNameOperator] = useState("");
  const [valueOperator, setValueOperator] = useState("");
  const [optionSelected, setOptionSelected] = useState("");
  const [optionValueSelected, setOptionValueSelected] = useState("");
  const dispatch=useDispatch();
  const categories=useSelector((state)=>state.category.data.list);

  const handlerValueOperator = (operator) => {
    if (operator.value === "") {
      setNameOperator("");
      setValueOperator("");
    } else {
      setNameOperator(operator.keyValue);
      setValueOperator(operator.value);
    }
    handlerOpenOptionOperator();
  }

  const handlerOpenOptionOperator = () => {
    setOpenValueOperator(!openValue);
    setOpenOptions(false);

  }

  const handlerOpenOptions = () => {
    setOpenOptions(!openOptions);
    setOpenValueOperator(false);
  }

  const handlerSelectedOption = (option) => {
    if (option.value === optionsFilter[0].value) {
      setOptionSelected("");
      setOptionValueSelected(option.value);
      
    } else {
      setOptionSelected(option.name);
      setOptionValueSelected(option.value);

    }
    setNameOperator("");
    setValueOperator("");
    handlerOpenOptions();
  }

  return (
    <section className="filter">
      {/*OPTIONS */}
      <div className="filter_option">
        <div className="container_title_filter" onClick={() => handlerOpenOptions()}>
          <i className="uil uil-filter icon_filter"></i> {optionSelected !== "" ? optionSelected : "Filtrar por"}
        </div>
        {
          openOptions === true ? <div className="options_filter">
            {
              optionsFilter.map((option, index) => (
                <div onClick={(e) => handlerSelectedOption(option)} key={index} className="item_option">{option.name}</div>
              ))
            }
          </div> : ""
        }
      </div>

      {/*OPERATOR */}

      {
        optionSelected === optionsFilter[1].name || optionSelected === optionsFilter[2].name ?
          <section className="filter">
            <div className="filter_option">
              <div className="container_title_filter" onClick={() => handlerOpenOptionOperator()} >
                <i className="uil uil-plus-circle icon_filter"></i> {nameOperator !== "" ? nameOperator : "Operador"}
              </div>
              {
                openValue === true ? <div className="options_filter_operator">
                  {
                    conditionals.map((operator, index) => (
                      <div onClick={()=>handlerValueOperator(operator)} key={index} className="item_option">{operator.keyValue}</div>
                    ))
                  }
                </div> : ""
              }
            </div>
          </section>
          : ""
      }

     {/*INPUT */}

      {
        optionValueSelected !=="" && valueOperator !=="" ?
          <input className="input_filter" type="number" placeholder="Ingrese un valor" />
          : ""
      }

    </section>
  )
}

export default Filter;