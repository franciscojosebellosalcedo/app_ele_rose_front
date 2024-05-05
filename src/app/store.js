import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import sectionActiveReducer from "../features/sectionActive/sectionActiveSlice";
import categoryReducer from "../features/category/categorySlice";
import productReducer from "../features/product/productSlice";
import collectionReducer from "../features/collection/collection";
import itemSliderReducer from "../features/itemSlider/itemSliderSlice";
import uploadCareReducer from "../features/uploadcare/uploadcare";
import orderReducer from "../features/order/orderSlice";
import clientReducer from "../features/client/clientSlice";
import userListReducer from "../features/user/userListSlice";
import ratingReducer from "../features/rating/ratingSlice";

export const store=configureStore({
    reducer:{
        user:userReducer,
        sectionActive:sectionActiveReducer,
        category:categoryReducer,
        product:productReducer,
        collection:collectionReducer,
        itemSlider:itemSliderReducer,
        uploadcare:uploadCareReducer,
        order:orderReducer,
        client:clientReducer,
        userList:userListReducer,
        rating:ratingReducer,
    },
});

