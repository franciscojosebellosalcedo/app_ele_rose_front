import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    list: [],
    found: [],
  },
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setListCollection: (state, action) => {
      state.data.list = action.payload;
      state.data.list.unshift({name:"Ninguna",_id:null});
    },
    setCollectionIsAssociatedSlider:(state,action)=>{
      const index=state.data.list.findIndex((p)=>p._id===action.payload);
      state.data.list[index].isAssociatedSlider=!state.data.list[index].isAssociatedSlider;
    },
    setListFoundCollection: (state, action) => {
      state.data.found = action.payload;
    },
    addCollection: (state, action) => {
      state.data.list.push(action.payload);
    },
    editCollection: (state, action) => {
      const list = state.data.list;
      const index = list.findIndex((coll) => coll._id === action.payload._id);
      list[index].name = action.payload.name;
      list[index].imagen = action.payload.imagen;
      state.data.list = list;
    },
    deleteToListAndFoundsCollection: (state, action) => {
      const listCollection = state.data.list;
      const foundsCollection = state.data.found;
      const indexList = listCollection.findIndex(
        (coll) => coll._id === action.payload
      );
      const indexCollectionFound = foundsCollection.findIndex(
        (coll) => coll._id === action.payload
      );
      listCollection.splice(indexList, 1);
      foundsCollection.splice(indexCollectionFound, 1);
      state.data.list = listCollection;
      state.data.found = foundsCollection;
    },
  },
});

export const {
  setListCollection,
  addCollection,
  setListFoundCollection,
  deleteToListAndFoundsCollection,
  editCollection,
  setCollectionIsAssociatedSlider
} = collectionSlice.actions;

export default collectionSlice.reducer;
