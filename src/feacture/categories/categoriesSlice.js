import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        list:[]
    },
}

export const categoriesSlice=createSlice({
    name:"categories",
    initialState,
    reducers:{
        setCategories:(state,action)=>{
            state.data.list=action.payload;
        },
        addCategorie:(state,action)=>{
            state.data.list=[action.payload,...state.data.list];
        },
        removeCategory:(state,action)=>{
            state.data.list=state.data.list.filter((cat)=>cat._id!==action.payload);
        },
        editCategory:(state,action)=>{
            const list=state.data.list;
            const index=list.findIndex((cat)=>cat._id===action.payload._id);
            list[index]=action.payload;
            state.data.list=list;
        }
    }
})

export const { setCategories,addCategorie,removeCategory,editCategory} = categoriesSlice.actions;

export default categoriesSlice.reducer;