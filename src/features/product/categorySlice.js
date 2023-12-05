import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:{
        list:[],
    },
}

export const productSlice=createSlice({
    name:"product",
    initialState,
    reducers:{
        setAllProducts:(state,action)=>{
            state.data.list=action.payload;
        }
    }
})

export const { setAllProducts} = productSlice.actions;

export default productSlice.reducer;