import { useSelector, useDispatch } from "react-redux";
import ItemCollection from "../../pages/dashboard/collections/itemCollection/ItemCollection";
import { useState } from "react";
import { setListFoundCollection } from "../../features/collection/collection";
import ItemCollectionSlider from "../../pages/dashboard/collections/itemCollection/ItemCollectionSlider";


const ContentCollectionSlider = (props) => {
    const [valueSearch, setValueSearch] = useState("");
    const collections = useSelector((state => state.collection.data.list.filter((coll) => coll.name !== "Ninguna")));
    const collectionsFound = useSelector((state => state.collection.data.found));

    const dispatch = useDispatch();
    const handlerFormSearch = (value) => {
        setValueSearch(value);
        searchCollection(value);
    }

    const searchCollection = (value) => {
        const collectionsFound = collections.filter((coll) => coll.name.trim().toLowerCase().includes(value.trim().toLowerCase()));
        dispatch(setListFoundCollection(collectionsFound));
    }
    return (
        <>
            <form className="form_search">
                <input onInput={(e) => handlerFormSearch(e.target.value)} value={valueSearch} type="search" className="input_search" placeholder="Buscar colección" />
            </form>

            <div className="list_categories_grid">
                {
                    valueSearch !== "" && collectionsFound.length > 0 ?
                        <>
                            {
                                collectionsFound.map((coll, index) => (
                                    <ItemCollectionSlider addItemSlider={props.addOneItemSlider} setValueSearch={setValueSearch} key={index} collection={coll} />
                                ))
                            }
                        </>
                        : collections && collections.length > 0 ?
                            <>
                                {
                                    collections.map((coll, index) => (
                                        <ItemCollectionSlider addItemSlider={props.addOneItemSlider} setValueSearch={setValueSearch} key={index} collection={coll} />
                                    ))
                                }
                            </>
                            : ""
                }
            </div>
        </>
    )
}

export default ContentCollectionSlider;