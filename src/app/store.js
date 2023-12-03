import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feacture/user/userSlice";
import sectionActiveReducer from "../feacture/sectionActive/sectionActiveSlice";
import categoriesReducer from "../feacture/categories/categoriesSlice";
import thunk from "redux-thunk";

export const store=configureStore({
    reducer:{
        user:userReducer,
        sectionActive:sectionActiveReducer,
        categories:categoriesReducer
    },
    middleware:[thunk]
});