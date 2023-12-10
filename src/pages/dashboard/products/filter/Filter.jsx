import { useState } from "react";
import { conditionals, optionsFilter } from "../../../../constants/constants";
import "./Filter.css";
import { useSelector, useDispatch } from "react-redux";
import { setProductsFound } from "../../../../features/product/productSlice";

const Filter = () => {
  const [openOptions, setOpenOptions] = useState(false);
  const [openValue, setOpenValueOperator] = useState(false);
  const [nameOperator, setNameOperator] = useState("");
  const [valueOperator, setValueOperator] = useState("");
  const [optionSelected, setOptionSelected] = useState("");
  const [optionValueSelected, setOptionValueSelected] = useState("");
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.data.list);
  const listProducts = useSelector((state) => state.product.data.list);
  const [nameCategory, setNameCategory] = useState("");
  const [openSelectCategory, setOpenSelectCategory] = useState(false);
  const [valueCategory, setValueCategory] = useState(null);
  const [valueInput,setValueInput]=useState("");

  const handlerInputFilter=(value)=>{
    setValueInput(value);
    filterProducts({property:optionSelected,operator:valueOperator,value});
  }

  const handlerOpenOptionCategories = () => {
    setOpenSelectCategory(!openSelectCategory);
  }

  const handlerValueCategory = (category) => {
    setValueCategory(category);
    setNameCategory(category?.name);
    filterProducts({ property: optionsFilter[3].name, value: category.name })
    handlerOpenOptionCategories();
  }

  const handlerValueOperator = (operator) => {
    if (operator.value === "") {
      setNameOperator("");
      setValueOperator("");
    } else {
      setNameOperator(operator.keyValue);
      setValueOperator(operator.value);
      console.log(optionSelected)
      filterProducts({property:optionSelected,operator:operator.value,value:valueInput});
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

  const filterProducts = (dataFilter) => {
    let productFoundFilter = [];
    if (dataFilter.property === optionsFilter[3].name) {
      productFoundFilter = listProducts.filter((p) => p.category.name === dataFilter.value);
    } else if (dataFilter.property === optionsFilter[4].name) {
      productFoundFilter = listProducts.filter((p) => p.isNow === true);
    } else if (dataFilter.property === optionsFilter[5].name) {
      productFoundFilter = listProducts.filter((p) => p.isNow === false);
    }else if (dataFilter.property === optionsFilter[1].name) {
      if(valueOperator===conditionals[1].value){
        productFoundFilter = listProducts.filter((p) => p.realPrice > parseInt(dataFilter.value));
      }else if(valueOperator===conditionals[2].value){
        productFoundFilter = listProducts.filter((p) => p.realPrice < parseInt(dataFilter.value));
      }else if(valueOperator===conditionals[3].value){
        productFoundFilter = listProducts.filter((p) => p.realPrice === parseInt(dataFilter.value));
      }
    }else if (dataFilter.property === optionsFilter[2].name) {
      if(valueOperator===conditionals[1].value){

        productFoundFilter = listProducts.filter((p) => p.amount > parseInt(dataFilter.value));
      }else if(valueOperator===conditionals[2].value){

        productFoundFilter = listProducts.filter((p) => p.amount < parseInt(dataFilter.value));
      }else if(valueOperator===conditionals[3].value){
        productFoundFilter = listProducts.filter((p) => p.amount === parseInt(dataFilter.value));
      }
    }
    dispatch(setProductsFound(productFoundFilter));
  }

  const handlerSelectedOption = (option) => {
    if (option.value === optionsFilter[0].value) {
      setOptionSelected("");
      setOptionValueSelected(option.value);

    } else {
      setOptionSelected(option.name);
      setOptionValueSelected(option.value);
      dispatch(setProductsFound([]));
    }
    if(option.name===optionsFilter[4].name || option.name===optionsFilter[5].name ){
      filterProducts({property:option.name,value:option.value});
    }
    setValueOperator("");
    setValueOperator("");
    setNameCategory("");
    setNameOperator("");
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
                      <div onClick={() => handlerValueOperator(operator)} key={index} className="item_option">{operator.keyValue}</div>
                    ))
                  }
                </div> : ""
              }
            </div>
          </section>
          : ""
      }
      {/*CATEGORIAS */}

      {
        optionSelected === optionsFilter[3].name ?
          <section className="filter">
            <div className="filter_option">
              <div className="container_title_filter" onClick={() => handlerOpenOptionCategories()} >
                <i className="uil uil-plus-circle icon_filter"></i> {nameCategory !== "" ? nameCategory : "Elije.."}
              </div>
              {
                openSelectCategory === true ? <div className="options_filter_operator">
                  {
                    categories.map((category, index) => (
                      <div onClick={() => handlerValueCategory(category)} key={index} className="item_option">{category?.name}</div>
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
        optionValueSelected !== "" && valueOperator !== "" ?
          <input onInput={(e)=>handlerInputFilter(e.target.value)} className="input_filter" type="number" placeholder="Ingrese un valor" />
          : ""
      }

    </section>
  )
}

export default Filter;