import { HEADERS, URL_BASE } from "../constants/constants"
import { headersWithAccessToken } from "../helpers/helpers";

export const updateCategory=async (accessToken,id,body)=>{
    const response=await fetch(URL_BASE+"/category/"+id,{
        method:"PUT",
        headers:headersWithAccessToken(HEADERS,accessToken),
        body:JSON.stringify(body)
    });
    return await  response.json();
}

export const createCategory=async (accessToken,body)=>{
    const response=await fetch(URL_BASE+"/category",{
        method:"POST",
        headers:headersWithAccessToken(HEADERS,accessToken),
        body:JSON.stringify(body)
    });
    return await  response.json();
}
export const getOneCategory=async (accessToken,id)=>{
    const response=await fetch(URL_BASE+"/category/"+id,{
        method:"GET",
        headers:headersWithAccessToken(HEADERS,accessToken),
    });
    return await  response.json();
}
export const getAllCategories=async (accessToken)=>{
    const response=await fetch(URL_BASE+"/category",{
        method:"GET",
        headers:headersWithAccessToken(HEADERS,accessToken),
    });
    return await  response.json();
}
export const deleteCategory=async (accessToken,id)=>{
    const response=await fetch(URL_BASE+"/category/"+id,{
        method:"DELETE",
        headers:headersWithAccessToken(HEADERS,accessToken),
    });
    return await  response.json();
}