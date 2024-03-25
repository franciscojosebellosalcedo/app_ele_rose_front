import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:{
        list:[],
        found:[]
    },
}

export const clientSlice=createSlice({
    name:"client",
    initialState,
    reducers:{
        setClients:(state,action)=>{
            state.data.list=action.payload;
        },
        setClientsFound:(state,action)=>{
            state.data.found=action.payload;
        },
    }
})

export const { setClients,setClientsFound} = clientSlice.actions;

export default clientSlice.reducer;