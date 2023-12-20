import { HEADERS, URL_BASE } from "../constants/constants"
import { headersWithAccessToken } from "../helpers/helpers";

export const deleteOneProducts=async (accessToken,id)=>{
    const response=await fetch(URL_BASE+"/product/"+id,{
        method:"DELETE",
        headers:headersWithAccessToken(HEADERS,accessToken),
    });
    return await  response.json();
}

export const getAllProducts=async (accessToken)=>{
    const response=await fetch(URL_BASE+"/product",{
        method:"GET",
        headers:headersWithAccessToken(HEADERS,accessToken),
    });
    return await  response.json();
}

export const updateProduct=async (accessToken,id,body)=>{
    const response=await fetch(URL_BASE+"/product/"+id,{
        method:"PUT",
        headers:headersWithAccessToken(HEADERS,accessToken),
        body:JSON.stringify(body)
    });
    return await  response.json();
}

export const createProduct=async (accessToken,body)=>{
    const response=await fetch(URL_BASE+"/product",{
        method:"POST",
        headers:headersWithAccessToken(HEADERS,accessToken),
        body:JSON.stringify(body)
    });
    return await  response.json();
}