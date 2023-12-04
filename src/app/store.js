import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import sectionActiveReducer from "../features/sectionActive/sectionActiveSlice";
import categoryReducer from "../features/category/categorySlice";

export const store=configureStore({
    reducer:{
        user:userReducer,
        sectionActive:sectionActiveReducer,
        category:categoryReducer
    },
});

