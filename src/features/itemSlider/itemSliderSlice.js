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
        addOneItemElementSlider:(state,action)=>{
            state.data.list.unshift(action.payload);
        },
        removeOneItemElementSlider:(state,action)=>{
            const index=state.data.list.findIndex((item)=>item._id===action.payload);
            state.data.list.splice(index,1);
        }
    }
})

export const {setAllItemsSlider ,addOneItemElementSlider,removeOneItemElementSlider } = itemSliderSlice.actions;

export default itemSliderSlice.reducer;