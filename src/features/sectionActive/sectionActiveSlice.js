import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        openMenu:false
    },
}

export const sectionActiveSlice=createSlice({
    name:"sectionActive",
    initialState,
    reducers:{
        setOpenMenu:(state)=>{
            state.data.openMenu=!state.data.openMenu;
        }
    }
})

export const { setOpenMenu} = sectionActiveSlice.actions;

export default sectionActiveSlice.reducer;