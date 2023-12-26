import { useState } from "react";
import { ROUTES } from "../../../../constants/constants";
import "./Collections.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ItemCollection from "../itemCollection/ItemCollection";
import Loader from "../../../../components/loader/Loader";
import { setListFoundCollection } from "../../../../features/collection/collection";



const Collections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [valueSearch, setValueSearch] = useState("");
  const collectionsFound = useSelector((state => state.collection.data.found));
  const collections = useSelector((state => state.collection.data.list.filter((coll)=>coll.name!=="Ninguna")));
  const isLoaderCollection = useSelector((state => state.sectionActive.data.isLoaderCollection));

  const handlerFormSearch=(value)=>{
    setValueSearch(value);
    searchCollection(value);
  }

  const searchCollection=(value)=>{
    const collectionsFound=collections.filter((coll)=>coll.name.trim().toLowerCase().includes(value.trim().toLowerCase()));
    dispatch(setListFoundCollection(collectionsFound));
  }

  return (
    <section className="container">
      <h1 className="container_title">Colecciones</h1>
      {
        isLoaderCollection === true ? <Loader /> :
          <>
            <button onClick={() => navigate(`${ROUTES.CREATE_COLLECTION}`)} className="btn btn_new_category">Crear colección</button>
            <form className="form_search">
              <input onInput={(e)=>handlerFormSearch(e.target.value)}  value={valueSearch} type="search" className="input_search" placeholder="Buscar colección" />
            </form>

            <div className="list_categories_grid">
              {
                valueSearch !== "" && collectionsFound.length > 0 ?
                  <>
                    {
                      collectionsFound.map((coll, index) => (
                        <ItemCollection setValueSearch={setValueSearch} key={index} collection={coll} />
                      ))
                    }
                  </>
                  : collections && collections.length > 0 ?
                    <>
                      {
                        collections.map((coll, index) => (
                          <ItemCollection setValueSearch={setValueSearch} key={index} collection={coll} />
                        ))
                      }
                    </>
                    : ""

              }
            </div>
          </>
      }
    </section>
  )
}

export default Collections