import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:{
        list:[],
        found:[]
    },
}

export const categorySlice=createSlice({
    name:"category",
    initialState,
    reducers:{
        searchCategory:(state,action)=>{
            state.data.found=state.data.list.filter((cat) => cat.name.toLowerCase().includes(action.payload));
        },
        setAllCategories:(state,action)=>{
            state.data.list=action.payload;
        },
        pushCategory:(state,action)=>{
            state.data.list=[action.payload,...state.data.list];
        },
        removeCategorie:(state,action)=>{
            const index=state.data.list.findIndex((cat)=>cat._id===action.payload);
            state.data.list.splice(index,1);
            const indexFounSearch=state.data.found.findIndex((cat)=>cat._id===action.payload);
            state.data.found.splice(indexFounSearch,1);
        },
        editCategory:(state,action)=>{
            const list=state.data.list;
            const index=state.data.list.findIndex((cat)=>cat._id===action.payload._id);
            list[index].name=action.payload.name;
            list[index].imagen=action.payload.imagen;
            state.data.list=list;
        }
    }
})

export const {setAllCategories,searchCategory,pushCategory,removeCategorie,editCategory } = categorySlice.actions;

export default categorySlice.reducer;