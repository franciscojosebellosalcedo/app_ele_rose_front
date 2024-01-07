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
            const indexProduct = state.data.list.findIndex((item) => item?.product._id === action.payload.product._id);
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
} = itemSliderSlice.actions;

export default itemSliderSlice.reducer;
