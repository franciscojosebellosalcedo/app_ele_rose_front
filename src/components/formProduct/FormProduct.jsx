import { useState } from "react";
import { optionsFilter } from "../../constants/constants";
import "./FormProduct.css";

const FormProduct = ({ dataImagen }) => {
  const [openSelect, setOpenSelect] = useState(false);
  const [openSectionDataMain, setOpenSectionDataMain] = useState(true);
  const [openSectionDataDiscont, setOpenSectionDataDiscont] = useState(false);

  const handlerOpenSectionDiscont = () => {
    setOpenSectionDataDiscont(!openSectionDataDiscont);
  }
  const handlerOpenSectionMain = () => {
    setOpenSectionDataMain(!openSectionDataMain);
  }

  return (
    <section className='container_modal'>
      <div className='modal '>
        <i className="uil uil-times icon_close_modal"></i>
        <h2 className="modal_title_main">Agregar producto</h2>
        <form className='form_product'>
          <article className="section_form_product">
            <h3 onClick={() => handlerOpenSectionMain()} className={`section_title ${openSectionDataMain && "title_section_active"}`}>Datos Principales <i className="uil uil-angle-right icon_arrow_title"></i></h3>
            {
              openSectionDataMain && <section className="section_data section_data_main">
                <img className="section_imagen" src={dataImagen.image} alt="" />
                <div className="container_input">
                  <label className="label_form_product" htmlFor="input_name_product">Nombre:</label>
                  <input className="input_form_product input_name_product" id="input_name_product" type="text" placeholder="Ingrese el nombre del producto" />
                </div>
                <div className="container_input">
                  <label className="label_form_product" htmlFor="input_description_product">Descripción (Opcional):</label>
                  <textarea className="input_description_product" name="" id="" cols="30" rows="10"></textarea>
                </div>

                <div className="container_input">
                  <label className="label_form_product" htmlFor="category">Categoría</label>
                  <section className="filter ">
                    <div className="filter_option input_select_category">
                      <div className="container_title_filter"  >
                        <i className="uil uil-apps icon_menu_item"></i> Elije...
                      </div>
                      {
                        openSelect === true ? <div className="options_filter_operator">
                          {
                            optionsFilter.map((option, index) => (
                              <div className="item_option">Categoría</div>
                            ))
                          }
                        </div> : ""
                      }
                    </div>
                  </section>
                </div>

                <div className="container_input">
                  <label className="label_form_product" htmlFor="input_price_product">Precio unidad:</label>
                  <input className="input_form_product input_price_product" id="input_price_product" type="number" placeholder="Ingrese el precio del producto" />
                </div>

                <div className="container_input">
                  <label className="label_form_product" htmlFor="input_amount_product">Cantidad:</label>
                  <input className="input_form_product input_amount_product" id="input_amount_product" type="number" placeholder="Ingrese la cantidad del producto" />
                </div>

                <div className="container_input_checkbox">
                  <label className="label_form_product" htmlFor="input_checkbox_product">Marcar como nuevo</label>
                  <input className=" input_checkbox_product" id="input_checkbox_product" type="checkbox" />
                </div>

              </section>
            }
          </article>

          <article className="section_form_product">
            <h3 onClick={() => handlerOpenSectionDiscont()} className={`section_title ${openSectionDataDiscont && "title_section_active"}`}>Aplicar descuento <i className="uil uil-angle-right icon_arrow_title"></i></h3>
            {
              openSectionDataDiscont && <section className="section_data">
                <div className="container_input">
                  <label className="label_form_product" htmlFor="input_percentage_product">Porcentaje:</label>
                  <input className="input_form_product input_percentage_product" id="input_percentage_product" type="number" placeholder="Ingrese el porcentaje del descuento" />
                </div>

                <div className="container_input">
                  <label className="label_form_product" htmlFor="input_discount_price_product">Precio descuento:</label>
                  <input readOnly className="input_form_product input_discount_price_product" id="input_discount_price_product" type="number" />
                </div>
              </section>
            }
          </article>
        </form>
      </div>
    </section>
  )
}

export default FormProduct;