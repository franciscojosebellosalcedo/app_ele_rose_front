import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:{
        list:[],
        found:[]
    },
}

export const orderSlice=createSlice({
    name:"order",
    initialState,
    reducers:{
        setOrdersFound:(state,action)=>{
            state.data.found=action.payload;
        },
        setOrders:(state,action)=>{
            state.data.list=action.payload;
        },
        setOrder:(state,action)=>{
            state.data.list[action.payload.index]=action.payload.order;
        }
    }
})

export const { setOrders,setOrder,setOrdersFound} = orderSlice.actions;

export default orderSlice.reducer;