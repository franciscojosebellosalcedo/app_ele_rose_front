import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        openMenu:false,
        openFormProduct:false,
        isLoaderCategories:false,
        isLoaderProducts:false,
        isLoaderCollection:false,
    },
}

export const sectionActiveSlice=createSlice({
    name:"sectionActive",
    initialState,
    reducers:{
        setLoaderCollections:(state,action)=>{
            state.data.isLoaderCollection=action.payload;
        },
        setLoaderCategories:(state,action)=>{
            state.data.isLoaderCategories=action.payload;
        },
        setLoaderProducts:(state,action)=>{
            state.data.isLoaderProducts=action.payload;
        },
        setOpenMenu:(state)=>{
            state.data.openMenu=!state.data.openMenu;
        },
        setOpenFormProduct:(state)=>{
            state.data.openFormProduct=!state.data.openFormProduct;
        }
    }
})

export const { setOpenMenu,setOpenFormProduct,setLoaderCategories,setLoaderProducts,setLoaderCollections} = sectionActiveSlice.actions;

export default sectionActiveSlice.reducer;