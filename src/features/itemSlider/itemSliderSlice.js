import { createSlice } from "@reduxjs/toolkit";
import { typeElementSlider } from "../../constants/constants";

const initialState = {
  data: {
    list: [],
  },
};

export const itemSliderSlice = createSlice({
  name: "itemSlider",
  initialState,
  reducers: {
    setAllItemsSlider: (state, action) => {
      state.data.list = action.payload;
    },
    setOneItemSlider:(state,action)=>{
      let index=null;
      if(action.payload.type===typeElementSlider[0]){
        index=state.data.list.findIndex((item)=>item?.product?._id===action.payload?.product?._id && item.type===action.payload.type);
        index != -1 ? state.data.list[index].product=action.payload.product:index=null;
      }else if (action.payload.type===typeElementSlider[1]){
        index=state.data.list.findIndex((item)=>item?.collection?._id===action.payload?.collection?._id && item.type===action.payload.type);
        index != -1 ? state.data.list[index].collection=action.payload.collection:index=null;
      }
    },
    addOneItemElementSlider: (state, action) => {
      state.data.list.unshift(action.payload);
    },
    removeOneItemElementSlider: (state, action) => {
      const index = state.data.list.findIndex(
        (item) => item._id === action.payload
      );
      state.data.list.splice(index, 1);
    },
    removeItemElementSliderByType: (state, action) => {
      if(action.payload.type===typeElementSlider[0]){
          const indexProduct = state.data.list.findIndex((item) => item?.product?._id === action.payload.product._id);
          state.data.list.splice(indexProduct,1);
      }else if(action.payload.type===typeElementSlider[1]){
          const indexCollection = state.data.list.findIndex((item) => item?.collection._id === action.payload.collection._id);
          state.data.list.splice(indexCollection,1);
      }
    },
  },
});

export const {
  setAllItemsSlider,
  addOneItemElementSlider,
  removeOneItemElementSlider,
  removeItemElementSliderByType,
  setOneItemSlider,
} = itemSliderSlice.actions;

export default itemSliderSlice.reducer;
