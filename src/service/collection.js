import { HEADERS, URL_BASE } from "../constants/constants"
import { headersWithAccessToken } from "../helpers/helpers";



export const createCollection=async (accessToken,body)=>{
    const response=await fetch(URL_BASE+"/collection",{
        method:"POST",
        headers:headersWithAccessToken(HEADERS,accessToken),
        body:JSON.stringify(body)
    });
    return await  response.json();
}

export const updateOneCollection=async (accessToken,id,body)=>{
    const response=await fetch(URL_BASE+"/collection/"+id,{
        method:"PUT",
        headers:headersWithAccessToken(HEADERS,accessToken),
        body:JSON.stringify(body)
    });
    return await  response.json();
}
export const getOneCollection=async (accessToken,id)=>{
    const response=await fetch(URL_BASE+"/collection/"+id,{
        method:"GET",
        headers:headersWithAccessToken(HEADERS,accessToken),
    });
    return await  response.json();
}
export const getAllCollection=async (accessToken)=>{
    const response=await fetch(URL_BASE+"/collection",{
        method:"GET",
        headers:headersWithAccessToken(HEADERS,accessToken),
    });
    return await  response.json();
}
export const deleteCollection=async (accessToken,id)=>{
    const response=await fetch(URL_BASE+"/collection/"+id,{
        method:"DELETE",
        headers:headersWithAccessToken(HEADERS,accessToken),
    });
    return await  response.json();
}