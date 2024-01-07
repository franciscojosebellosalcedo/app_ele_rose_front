import { HEADERS, URL_BASE } from "../constants/constants"
import { headersWithAccessToken } from "../helpers/helpers";



export const removeItemSlider=async (accessToken,id)=>{
    const response=await fetch(URL_BASE+"/itemSlider/"+id,{
        method:"DELETE",
        headers:headersWithAccessToken(HEADERS,accessToken),
    });
    return await  response.json();
}

export const addItemSlider=async (accessToken,body)=>{
    const response=await fetch(URL_BASE+"/itemSlider",{
        method:"POST",
        headers:headersWithAccessToken(HEADERS,accessToken),
        body:JSON.stringify(body)
    });
    return await  response.json();
}
export const getAllItemSlider=async (accessToken,body)=>{
    const response=await fetch(URL_BASE+"/itemSlider",{
        method:"GET",
        headers:headersWithAccessToken(HEADERS,accessToken),
    });
    return await  response.json();
}