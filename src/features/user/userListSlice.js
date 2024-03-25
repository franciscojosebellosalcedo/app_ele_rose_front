import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
       list:[],
       found:[]
    },
}

export const userListSlice=createSlice({
    name:"userList",
    initialState,
    reducers:{
        setUserList:(state,action)=>{
            state.data.list=action.payload;
        },
        setUserListFound:(state,action)=>{
            state.data.found=action.payload;
        }
    }
})

export const { setUserList,setUserListFound} = userListSlice.actions;

export default userListSlice.reducer;