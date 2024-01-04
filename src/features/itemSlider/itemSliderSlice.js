import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:{
        list:[],
    },
}

export const itemSliderSlice=createSlice({
    name:"itemSlider",
    initialState,
    reducers:{
        setAllItemsSlider:(state,action)=>{
            state.data.list=action.payload;
        },
    }
})

export const {setAllItemsSlider } = itemSliderSlice.actions;

export default itemSliderSlice.reducer;