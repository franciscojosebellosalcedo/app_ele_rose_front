import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:{
        list:[],
    },
}

export const uploadCareSlice=createSlice({
    name:"uploadcare",
    initialState,
    reducers:{
        setImages:(state,action)=>{
            state.data.list=action.payload;
        },
        addImagen:(state,action)=>{
            state.data.list.push(action.payload);
        },
        removeImagenByUuid:async(state,action)=>{
            const list=state.data.list;
            const listUuid=action.payload;
            if(listUuid.length>0){
                for (let index = 0; index < listUuid.length; index++) {
                    const uuid = listUuid[index];
                    for (let j = 0; j < list.length; j++) {
                        const imagen = list[j];
                        if(imagen.uuid===uuid){
                            list.splice(j,1);
                        }                    
                    }
                    
                }
            }
            state.data.list=list;
        }
    }
})

export const {setImages,removeImagenByUuid,addImagen} = uploadCareSlice.actions;

export default uploadCareSlice.reducer;