import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:{
        list:[],
    },
}

export const ratingSlice=createSlice({
    name:"rating",
    initialState,
    reducers:{
        setAllRating:(state,action)=>{
            state.data.list=action.payload;
        }
    }
})

export const {setAllRating} = ratingSlice.actions;

export default ratingSlice.reducer;