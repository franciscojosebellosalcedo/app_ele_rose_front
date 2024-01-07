import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    openMenu: false,
    openFormProduct: false,
    isLoaderCategories: false,
    isLoaderProducts: false,
    isLoaderCollection: false,
    isLoaderItemsSlider: false,
  },
};

export const sectionActiveSlice = createSlice({
  name: "sectionActive",
  initialState,
  reducers: {
    setLoaderItemsSlider: (state, action) => {
      state.data.isLoaderItemsSlider = action.payload;
    },
    setLoaderCollections: (state, action) => {
      state.data.isLoaderCollection = action.payload;
    },
    setLoaderCategories: (state, action) => {
      state.data.isLoaderCategories = action.payload;
    },
    setLoaderProducts: (state, action) => {
      state.data.isLoaderProducts = action.payload;
    },
    setOpenMenu: (state) => {
      state.data.openMenu = !state.data.openMenu;
    },
    setOpenFormProduct: (state) => {
      state.data.openFormProduct = !state.data.openFormProduct;
    },
  },
});

export const {
  setOpenMenu,
  setOpenFormProduct,
  setLoaderCategories,
  setLoaderProducts,
  setLoaderCollections,
  setLoaderItemsSlider,
} = sectionActiveSlice.actions;

export default sectionActiveSlice.reducer;
