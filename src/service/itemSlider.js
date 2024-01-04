import { HEADERS, URL_BASE } from "../constants/constants"
import { headersWithAccessToken } from "../helpers/helpers";



export const addItemSlider=async (accessToken,body)=>{
    const response=await fetch(URL_BASE+"/itemSlider",{
        method:"POST",
        headers:headersWithAccessToken(HEADERS,accessToken),
        body:JSON.stringify(body)
    });
    return await  response.json();
}
export const getItemSlider=async (accessToken,body)=>{
    const response=await fetch(URL_BASE+"/itemSlider",{
        method:"GET",
        headers:headersWithAccessToken(HEADERS,accessToken),
    });
    return await  response.json();
}