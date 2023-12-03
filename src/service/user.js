import { HEADERS, URL_BASE } from "../constants/constants"

export const loginUser=async (data)=>{
    const response=await fetch(URL_BASE+"/user/login",{
        method:"POST",
        headers:HEADERS,
        body:JSON.stringify(data)
    });
    return await  response.json();
}

export const getNewTokenUser=async (token)=>{
    HEADERS["access-token"]=`bearer ${token}`;
    const response=await fetch(URL_BASE+"/user/refress-token",{
        method:"GET",
        headers:HEADERS,
    });
    return response.json(); 
}