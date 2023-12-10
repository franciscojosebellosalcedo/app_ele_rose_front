import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        openMenu:false,
        openFormProduct:false,
    },
}

export const sectionActiveSlice=createSlice({
    name:"sectionActive",
    initialState,
    reducers:{
        setOpenMenu:(state)=>{
            state.data.openMenu=!state.data.openMenu;
        },
        setOpenFormProduct:(state)=>{
            state.data.openFormProduct=!state.data.openFormProduct;
        }
    }
})

export const { setOpenMenu,setOpenFormProduct} = sectionActiveSlice.actions;

export default sectionActiveSlice.reducer;