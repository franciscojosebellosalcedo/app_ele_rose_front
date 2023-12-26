import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import sectionActiveReducer from "../features/sectionActive/sectionActiveSlice";
import categoryReducer from "../features/category/categorySlice";
import productReducer from "../features/product/productSlice";
import collectionReducer from "../features/collection/collection";

export const store=configureStore({
    reducer:{
        user:userReducer,
        sectionActive:sectionActiveReducer,
        category:categoryReducer,
        product:productReducer,
        collection:collectionReducer,
    },
});

