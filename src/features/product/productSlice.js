import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:{
        list:[],
        added:[],
    },
}

export const productSlice=createSlice({
    name:"product",
    initialState,
    reducers:{
        setAllProducts:(state,action)=>{
            state.data.list=action.payload;
        },
        addProductToAdded:(state,action)=>{
            state.data.added.unshift(action.payload);
        }
    }
})

export const { setAllProducts,addProductToAdded} = productSlice.actions;

export default productSlice.reducer;