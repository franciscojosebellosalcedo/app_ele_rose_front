import { ROUTES } from "../../../../constants/constants";
import "./CreateProduct.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";


const CreateProduct = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data.user);
  const [base64Strings, setBase64Strings] = useState([]);

  const convertirABase64 = (event) => {
    const input = event.target;
    
    if (input.files.length > 0) {
      const files = Array.from(input.files);

      Promise.all(files.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = function (e) {
            const base64String = e.target.result;
            resolve(base64String);
          };
          reader.readAsDataURL(file);
        });
      })).then(base64Array => {
        setBase64Strings([...base64Strings, ...base64Array]);
      });
    } else {
      setBase64Strings([]);
    }
  };


  return (
    <div className="container">
      <i onClick={() => navigate(`/${ROUTES.DASHBOARD}/${ROUTES.PRODUCTS}`)} className="uil uil-arrow-left icon_back_section"></i>
      <h1 className="container_title">Nuevos productos</h1>
      <p className="text_infomative">{user?.name} en esta sección puedes escojer una lista de imagenes 😘</p>
      <form className="form_files" >
        <label className="label_input_file" htmlFor="input_file"><i className="uil uil-image-plus icon_add_files"></i>  Cargar imagenes</label>
        <input onInput={(e) => convertirABase64(e)} id="input_file" multiple className="input_file" type="file" accept="image/*" />
      </form>
      <section className="list_imagen_selected">
        {
          base64Strings && base64Strings.length > 0 ?
            <>
              {
                base64Strings.map((img, index) => {
                  return <div className="item_grid" key={index}>
                    <img className="item_img_grid" src={img}/>
                  </div>
                })
              }
            </>
            : ""
        }
      </section>
    </div>
  )
}

export default CreateProduct;