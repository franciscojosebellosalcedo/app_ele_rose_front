import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    openMenu: false,
    openFormProduct: false,
    isLoaderCategories: false,
    isLoaderProducts: false,
    isLoaderCollection: false,
    isLoaderItemsSlider: false,
    isLoaderItemsOrder: false,
    isLoaderItemsClients: false,
    isLoaderItemsUserList: false,
    listStatusOrder:[]
  },
};

export const sectionActiveSlice = createSlice({
  name: "sectionActive",
  initialState,
  reducers: {
    handlerIsOpenListStatusOrder: (state, action) => {
      const list = state.data.listStatusOrder;
      if (list[action.payload].isOpen) {
        list[action.payload].isOpen = false;
      } else {
        for (let index = 0; index < list.length; index++) {
            list[index].isOpen = false;
        }
        list[action.payload].isOpen = true;
      }
      state.data.listStatusOrder=list;
    },
    setLoaderItemsUserList: (state, action) => {
      state.data.isLoaderItemsUserList = action.payload;
    },
    setListStatusOrder: (state, action) => {
      state.data.listStatusOrder = action.payload;
    },
    setLoaderItemsClients: (state, action) => {
      state.data.isLoaderItemsClients = action.payload;
    },
    setLoaderItemsOrder: (state, action) => {
      state.data.isLoaderItemsOrder = action.payload;
    },
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
  setLoaderItemsOrder,
  setListStatusOrder,
  handlerIsOpenListStatusOrder,
  setLoaderItemsClients,
  setLoaderItemsUserList,
} = sectionActiveSlice.actions;

export default sectionActiveSlice.reducer;
