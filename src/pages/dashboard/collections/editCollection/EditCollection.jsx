import { useState } from 'react';
import Loader from '../../../../components/loader/Loader';
import { ROUTES } from '../../../../constants/constants';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { convertToBase64 } from '../../../../helpers/helpers';
import { toast } from "sonner";
import { useEffect } from 'react';
import { getOneCollection, updateOneCollection } from '../../../../service/collection';
import { editCollection } from '../../../../features/collection/collection';
import { editCollectionProduct } from '../../../../features/product/productSlice';

const EditCollection = () => {
    const [isLoader, setIsLoader] = useState(false);
    const [collection, setCollection] = useState({ _id: "", name: "", imagen: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const accessToken = useSelector((state) => state.user.data.accessToken);
    const collections = useSelector((state) => state.collection.data.list);

    const handlerFormCollection = async (target, value) => {
        if (target === "imagen") {
            const base64 = await convertToBase64(value);
            setCollection({ ...collection, imagen: base64 });
        } else {
            setCollection({ ...collection, name: value });
        }
    }

    const validate = () => {
        return collection.name === "" || collection.imagen === "";
    }

    const updateCollection = async (e) => {
        e.preventDefault();
        setIsLoader(true);
        try {
            if (accessToken) {
                if (validate()) {
                    toast.warning("Llene los campos por favor");
                } else {
                    const filterColl = collections.filter((coll) => coll._id !== collection._id);
                    const collectionFound = filterColl.find((coll) => coll.name.toLowerCase().includes(collection.name.toLocaleLowerCase()));
                    if(collectionFound){
                        toast.warning("Esta colección ya existe");
                    }else{
                        const responseEditCollection=await updateOneCollection(accessToken,collection._id,{name:collection.name,imagen:collection.imagen});
                        if(responseEditCollection.status===200 && responseEditCollection.response){
                            const data=responseEditCollection.data;
                            dispatch(editCollection(data));
                            dispatch(editCollectionProduct(data));
                            toast.success(responseEditCollection.message);
                        }else{
                            toast.error(responseEditCollection.message);
                        }
                    }
                }
            }
        } catch (error) {
            toast.error("Se produjo un error en el servidor");
        }
        setIsLoader(false);
    }

    const getCollection = async () => {
        setIsLoader(true);
        try {
            if (accessToken) {
                const id = params.id;
                const responseGetCollection = await getOneCollection(accessToken, id);
                if (responseGetCollection.status === 200 && responseGetCollection.response) {
                    const data = responseGetCollection.data;
                    if (!data) {
                        navigate(`/${ROUTES.DASHBOARD}/${ROUTES.COLLECTIONS}`)
                    } else {
                        setCollection(data)
                    }
                } else {
                    navigate(`/${ROUTES.DASHBOARD}/${ROUTES.COLLECTIONS}`)
                }
            }
        } catch (error) {
            toast.error("Se produjo un error en obtener la coleccion")
        }
        setIsLoader(false);
    }

    useEffect(() => {
        getCollection();
    }, []);

    return (
        <section className="container">
            {isLoader === true ? <Loader /> : ""}
            <i onClick={() => navigate(`/${ROUTES.DASHBOARD}/${ROUTES.COLLECTIONS}`)} className="uil uil-arrow-left icon_back_section"></i>
            <h1 className="container_title">Editar colección</h1>
            <form className="form_category form_create_category">
                <section className="form_section">
                    <label htmlFor="name_category">Nombre:</label>
                    <input onInput={(e) => handlerFormCollection("name", e.target.value)} defaultValue={collection?.name} className="input_form_category" type="text" placeholder="Ingrese el nombre de la categoria" id="name_edit_collection" />
                </section>
                <section className="form_section form_section_input_file">
                    <label htmlFor="imagen_edit_collection">Imagen:</label>
                    <label htmlFor="imagen_edit_collection" className="label_input_image_category">Seleccionar imagen</label>
                    <input onInput={(e) => handlerFormCollection("imagen", e.target.files)} accept="image/*" className="input_form_category input_file_category" type="file" placeholder="Ingrese el nombre de la categoria" id="imagen_edit_collection" />
                </section>
                {collection?.imagen && <img className="imagen_new_category" src={collection?.imagen} alt="imagen category" />}
            </form>
            <button onClick={(e) => updateCollection(e)} className="btn btn_create_category">Guardar</button>
        </section>
    )
}

export default EditCollection;