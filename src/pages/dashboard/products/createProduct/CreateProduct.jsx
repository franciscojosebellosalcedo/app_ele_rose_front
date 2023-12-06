import { ROUTES } from "../../../../constants/constants";
import "./CreateProduct.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Loader from "../../../../components/loader/Loader";
import FormProduct from "../../../../components/formProduct/FormProduct";
import { addImage, removeAllImagens, removeOneImage, setImagens } from "../../../../features/product/productSlice";


const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data.user);
  const imagens = useSelector((state) => state.product.data.imagens);
  const [base64Strings, setBase64Strings] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);

  const deleteOneImageSelected = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeOneImage(index));
  }

  const handlerSelectedImage = (data) => {
    setImageSelected(data);
  }

  const convertirABase64 = (event) => {
    setIsLoader(true);
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
        dispatch(addImage([...base64Array]));
      });
    } else {
      dispatch(setImagens());
    }
    setIsLoader(false);
  };

  const deleteAllImagensSelected = (e) => {
    e.preventDefault();
    dispatch(removeAllImagens());
  }


  return (
    <div className="container container_create_product">
      <i onClick={() => navigate(`/${ROUTES.DASHBOARD}/${ROUTES.PRODUCTS}`)} className="uil uil-arrow-left icon_back_section"></i>
      <h1 className="container_title">Nuevos productos</h1>
      <p className="text_infomative">{user?.name} en esta sección puedes escojer una lista de imagenes 😘</p>
      <form className="form_files" >
        <label className="label_input_file" htmlFor="input_file"><i className="uil uil-image-plus icon_add_files"></i> Listar</label>
        <input onInput={(e) => convertirABase64(e)} id="input_file" multiple className="input_file" type="file" accept="image/*" />
        {
          imagens && imagens.length > 0 ?
            <button onClick={(e)=>deleteAllImagensSelected(e)} className="btn_delete_all_imagens">Eliminar imagenes</button>
            : ""
        }
      </form>
      <section className="list_imagen_selected">
        <>
          {
            isLoader === true ? <Loader /> :
              <>
                {
                  imagens && imagens.length > 0 ?
                    <>
                      {
                        imagens.map((img, index) => {
                          return <div onClick={() => handlerSelectedImage({ image: img, index })} className="item_grid" key={index}>
                            <i className="uil uil-multiply icon_delete_img" onClick={(e) => deleteOneImageSelected(e, index)}></i>
                            <img className="item_img_grid" src={img} />
                          </div>
                        })
                      }
                    </>
                    : ""
                }
              </>
          }
        </>
        {
          imageSelected && <FormProduct dataImagen={imageSelected} setImageSelected={setImageSelected} />
        }
      </section>
    </div>
  )
}

export default CreateProduct;