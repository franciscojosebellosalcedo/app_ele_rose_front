import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:{
        list:[]
    },
}

export const categorySlice=createSlice({
    name:"category",
    initialState,
    reducers:{
        setAllCategories:(state,action)=>{
            state.data.list=action.payload;
        },
        pushCategory:(state,action)=>{
            state.data.list=[action.payload,...state.data.list];
        },
        removeCategorie:(state,action)=>{
            const index=state.data.list.findIndex((cat)=>cat._id===action.payload);
            state.data.list.splice(index,1);
        },
        editCategory:(state,action)=>{
            const list=state.data.list;
            const index=state.data.list.findIndex((cat)=>cat._id===action.payload._id);
            list[index].name=action.payload.name;
            state.data.list=list;
        }
    }
})

export const {setAllCategories,pushCategory,removeCategorie,editCategory } = categorySlice.actions;

export default categorySlice.reducer;