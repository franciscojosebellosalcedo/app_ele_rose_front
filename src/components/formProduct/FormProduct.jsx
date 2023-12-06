import { useState } from "react";
import "./FormProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { createProduct } from "../../service/product";
import { addNewProduct, removeOneImage } from "../../features/product/productSlice";
import Loader from "../loader/Loader";

const FormProduct = ({ dataImagen, setImageSelected }) => {
  const dispatch=useDispatch();
  const [openSelect, setOpenSelect] = useState(false);
  const [openSectionDataMain, setOpenSectionDataMain] = useState(true);
  const [openSectionDataDiscont, setOpenSectionDataDiscont] = useState(false);
  const categories = useSelector((state) => state.category.data.list);
  const accessToken = useSelector((state) => state.user.data.accessToken);
  const [isLoader,setIsLoader]=useState(false);
  const [nameCategorySelected, setNameCategorySelected] = useState("");
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    isNow: false,
    amount: "",
    percentage: "",
    realPrice: "",
    pricePromotion: "",
    imagen: dataImagen.image
  });

  const handlerNameOptionSelected = (name, value) => {
    handlerFormProduct("category", value);
    setNameCategorySelected(name);
    handlerOpenSelect();
  }

  const handlerOpenSelect = () => {
    setOpenSelect(!openSelect);
  }

  const handlerOpenSectionDiscont = () => {
    setOpenSectionDataDiscont(!openSectionDataDiscont);
  }

  const handlerOpenSectionMain = () => {
    setOpenSectionDataMain(!openSectionDataMain);
  }

  const handlerFormProduct = (target, value) => {
    if(target==="realPrice" && product.percentage !== ""){
      setPromotionProduct(product,product.percentage);
    }
    if (target === "percentage") {
      if (product.realPrice === "") {
        toast.warning("Por favor ingrese primero el precio del producto");
        return;
      } else {
        setPromotionProduct(product, convertToNumber(target,value));
      }
    }
    setProduct({ ...product, [target]: convertToNumber(target,value) });

  }

  const setPromotionProduct = (product, percentage) => {
    const percentageFinish = parseInt(percentage) / 100;
    const pricePromotion = parseInt(product.realPrice) * percentageFinish;
    const pricePromotionFinal = parseInt(product.realPrice) - pricePromotion;
    const data = product;
    data.pricePromotion = pricePromotionFinal;
    data.percentage = percentage;
    setProduct({ ...data });
  }

  const convertToNumber=(target,value)=>{
    if(target==="amount" || target==="realPrice" || target==="percentage" ||  target==="pricePromotion"){
      return parseInt(value);
    }
    return value;
  }

  const isEmptyFiels=()=>{
    if(product.name==="" || product.category==="" || product.amount==="" || product.realPrice==="" || product.imagen===""){
      return false;
    }
    return true;
  }

  const addProduct =async  (e) => {
    e.preventDefault();
    setIsLoader(true);
    if(!isEmptyFiels()){
      toast.warning("Por favor llene los campos necesarios");
    }else{
      try {
        if(accessToken){
          const responseCretaed=await createProduct(accessToken,product);
          if(responseCretaed.status===200 && responseCretaed.response){
            const data=responseCretaed.data;
            dispatch(addNewProduct(data));
            dispatch(removeOneImage(dataImagen.index));
            setImageSelected(null);
            toast.success(responseCretaed.message);
          }else{
            toast.error(responseCretaed.message);
          }
        }
      } catch (error) {
        toast.error("Se produjo un error en el servidor");
      }
    }
    setIsLoader(false);
  }

  return (
    <section className='container_modal'>
      <div className='modal '>
        <i onClick={() => setImageSelected(null)} className="uil uil-times icon_close_modal"></i>
        <h2 className="modal_title_main">Agregar producto</h2>
        <form className='form_product'>
          <article className="section_form_product">
            <h3 onClick={() => handlerOpenSectionMain()} className={`section_title ${openSectionDataMain && "title_section_active"}`}>Datos Principales <i className="uil uil-angle-right icon_arrow_title"></i></h3>
            {
              openSectionDataMain && <section className="section_data section_data_main">
                <img className="section_imagen" src={dataImagen.image} alt="" />
                <div className="container_input">
                  <label className="label_form_product" htmlFor="input_name_product">Nombre:</label>
                  <input onInput={(e) => handlerFormProduct("name", e.target.value)} defaultValue={product.name} className="input_form_product input_name_product" id="input_name_product" type="text" placeholder="Ingrese el nombre del producto" />
                </div>
                <div className="container_input">
                  <label className="label_form_product" htmlFor="input_description_product">Descripción (Opcional):</label>
                  <textarea onInput={(e) => handlerFormProduct("description", e.target.value)} defaultValue={product.description} className="input_description_product" name="" id="" cols="30" rows="10"></textarea>
                </div>

                <div className="container_input">
                  <label className="label_form_product" htmlFor="category">Categoría</label>
                  <section className="filter ">
                    <div className="filter_option input_select_category">
                      <div className="container_title_filter" onClick={() => handlerOpenSelect()}  >
                        <i className="uil uil-apps icon_menu_item"></i> {nameCategorySelected !== "" ? nameCategorySelected : "Elije..."}
                      </div>
                      {
                        openSelect === true ? <div className="options_filter_operator">
                          {
                            categories && categories.length > 0 ? categories.map((category, index) => (
                              <div onClick={() => handlerNameOptionSelected(category.name, category._id)} key={index} className="item_option">{category.name}</div>
                            )) : ""
                          }
                        </div> : ""
                      }
                    </div>
                  </section>
                </div>

                <div className="container_input">
                  <label className="label_form_product" htmlFor="input_price_product">Precio unidad:</label>
                  <input onInput={(e) => handlerFormProduct("realPrice", e.target.value)} defaultValue={product.realPrice} className="input_form_product input_price_product" id="input_price_product" type="number" placeholder="Ingrese el precio del producto" />
                </div>

                <div className="container_input">
                  <label className="label_form_product" htmlFor="input_amount_product">Cantidad:</label>
                  <input onInput={(e) => handlerFormProduct("amount", e.target.value)} defaultValue={product.amount} className="input_form_product input_amount_product" id="input_amount_product" type="number" placeholder="Ingrese la cantidad del producto" />
                </div>

                <div className="container_input_checkbox">
                  <label className="label_form_product" htmlFor="input_checkbox_product">Marcar como nuevo (Opcional)</label>
                  <input onInput={(e) => handlerFormProduct("isNow", e.target.checked)} defaultChecked={product.isNow} className=" input_checkbox_product" id="input_checkbox_product" type="checkbox" />
                </div>

              </section>
            }
          </article>

          <article className="section_form_product">
            <h3 onClick={() => handlerOpenSectionDiscont()} className={`section_title ${openSectionDataDiscont && "title_section_active"}`}>Aplicar descuento (Opcional) <i className="uil uil-angle-right icon_arrow_title"></i></h3>
            {
              openSectionDataDiscont && <section className="section_data">
                <div className="container_input">
                  <label className="label_form_product" htmlFor="input_percentage_product">Porcentaje:</label>
                  <input onInput={(e) => handlerFormProduct("percentage", e.target.value)} defaultValue={product.percentage} className="input_form_product input_percentage_product" id="input_percentage_product" type="number" placeholder="Ingrese el porcentaje del descuento" />
                </div>

                <div className="container_input">
                  <label className="label_form_product" htmlFor="input_discount_price_product">Precio descuento:</label>
                  <input value={product.pricePromotion} readOnly className="input_form_product input_discount_price_product" id="input_discount_price_product" type="number" />
                </div>
              </section>
            }
          </article>
        </form>
        <button onClick={(e) => addProduct(e)} className="btn btn_add_product"><i className="uil uil-plus-circle icon_add_product"></i> Agregar</button>
      </div>
      {isLoader && <Loader/>}
    </section>
  )
}

export default FormProduct;