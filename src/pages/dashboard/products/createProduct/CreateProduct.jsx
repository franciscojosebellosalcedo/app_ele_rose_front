import { PUBLIC_KEY_UPLOADCARE, ROUTES } from "../../../../constants/constants";
import "./CreateProduct.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import Loader from "../../../../components/loader/Loader";
import FormProduct from "../../../../components/formProduct/FormProduct";
import { toast } from "sonner";
import { addImage, removeAllImagens, removeOneImage, setImagens } from "../../../../features/product/productSlice";
import { setOpenFormProduct } from "../../../../features/sectionActive/sectionActiveSlice";
import { Widget } from '@uploadcare/react-widget';

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data.user);
  const imagens = useSelector((state) => state.product.data.imagens);
  const openFormProduct = useSelector((state) => state.sectionActive.data.openFormProduct);
  const [base64Strings, setBase64Strings] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const deleteOneImageSelected = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeOneImage(index));
  }

  const handlerOpenForm = (data) => {
    dispatch(setOpenFormProduct());
    setImageSelected(data);
  }

  const setAllImages = (infoFile) => {
    console.log(infoFile)
    if (infoFile) {
      const count = infoFile.count;
      const listImages = [];
      for (let index = 0; index < count; index++) {
        const image = `${infoFile.cdnUrl}nth/${index}/`;
        listImages.push(image);
      }
      dispatch(addImage(listImages));
    }
  }

  // const convertirABase64 = (event) => {
  //   setIsLoader(true);
  //   const input = event.target;

  //   if (input.files.length > 0) {
  //     const files = Array.from(input.files);

  //     Promise.all(files.map(file => {
  //       return new Promise((resolve) => {
  //         const reader = new FileReader();
  //         reader.onload = function (e) {
  //           const base64String = e.target.result;
  //           resolve(base64String);
  //         };
  //         reader.readAsDataURL(file);
  //       });
  //     })).then(base64Array => {
  //       dispatch(addImage([...base64Array]));
  //     });
  //   } else {
  //     dispatch(setImagens());
  //   }
  //   setIsLoader(false);
  // };

  const deleteAllImagensSelected = (e) => {
    e.preventDefault();
    if (!openConfirm) {
      toast(`¿ Desea eliminar las imagenes restantes ?`, {
        action: {
          label: "Si",
          onClick: async () => {
            setIsLoader(true);
            dispatch(removeAllImagens());
            setOpenConfirm(false);
            setIsLoader(false);
          }
        },
        cancel: {
          label: "No",
          onClick: () => {
            setOpenConfirm(false);
          }
        },
        onAutoClose: () => {
          setOpenConfirm(false);
        },
        onDismiss: () => {
          setOpenConfirm(false);
        }
      })
      setOpenConfirm(true);
    }
  }

  return (
    <div className="container container_create_product">
      <i onClick={() => navigate(`/${ROUTES.DASHBOARD}/${ROUTES.PRODUCTS}`)} className="uil uil-arrow-left icon_back_section"></i>
      <h1 className="container_title">Nuevos productos</h1>
      <p className="text_infomative">{user?.name} en esta sección puedes escojer una lista de imagenes 😘</p>
      <form className="form_files" >
        {/* <label className="label_input_file" htmlFor="input_file"><i className="uil uil-image-plus icon_add_files"></i> Listar imágenes</label>
        <input onInput={(e) => convertirABase64(e)} id="input_file" multiple className="input_file" type="file" accept="image/*" /> */}
        {
          isLoader === true ? <Loader /> :
            <Widget
              publicKey={PUBLIC_KEY_UPLOADCARE}
              onChange={(infoFile) => setAllImages(infoFile)}
              multiple
            />
        }
        {
          imagens && imagens.length > 0 ?
            <button onClick={(e) => deleteAllImagensSelected(e)} className="btn_delete_all_imagens">Eliminar imagenes</button>
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
                          return <div onClick={() => handlerOpenForm({ image: img, index })} className="item_grid" key={index}>
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
          openFormProduct === true ? <FormProduct dataImagen={imageSelected} fnHandlerOpenForm={handlerOpenForm} productSeleted={null} /> : ""
        }
      </section>
    </div>
  )
}

export default CreateProduct;