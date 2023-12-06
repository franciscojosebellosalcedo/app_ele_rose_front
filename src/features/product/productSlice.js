import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    list: [],
    imagens: [],
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.data.list = action.payload;
    },
    addNewProduct: (state, action) => {
      state.data.list.unshift(action.payload);
    },
    removeOneProduct: (state, action) => {
      const index = state.data.list.findIndex((p) => p._id === action.payload);
      state.data.list.splice(index, 1);
    },
    setImagens: (state) => {
      const imagens = state.data.imagens;
      state.data.imagens = imagens;
    },
    addImage: (state, action) => {
      state.data.imagens = [...state.data.imagens, ...action.payload];
    },
    removeOneImage: (state, action) => {
      state.data.imagens.splice(action.payload, 1);
    },
    removeAllImagens: (state) => {
      state.data.imagens.length = 0;
    },
  },
});

export const {
  setAllProducts,
  addImage,
  removeOneImage,
  setImagens,
  removeAllImagens,
  addNewProduct,
  removeOneProduct,
} = productSlice.actions;

export default productSlice.reducer;
