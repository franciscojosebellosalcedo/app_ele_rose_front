import { HEADERS, URL_BASE } from "../constants/constants"
import { headersWithAccessToken } from "../helpers/helpers";

export const deleteOneProducts=async (accessToken,id)=>{
    const response=await fetch(URL_BASE+"/jewelry/"+id,{
        method:"DELETE",
        headers:headersWithAccessToken(HEADERS,accessToken),
    });
    return await  response.json();
}

export const getAllProducts=async (accessToken)=>{
    const response=await fetch(URL_BASE+"/jewelry",{
        method:"GET",
        headers:headersWithAccessToken(HEADERS,accessToken),
    });
    return await  response.json();
}

export const createProduct=async (accessToken,body)=>{
    const response=await fetch(URL_BASE+"/jewelry",{
        method:"POST",
        headers:headersWithAccessToken(HEADERS,accessToken),
        body:JSON.stringify(body)
    });
    return await  response.json();
}