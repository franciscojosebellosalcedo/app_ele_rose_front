import { HEADERS, URL_BASE } from "../constants/constants"
import { headersWithAccessToken } from "../helpers/helpers";

export const loginUser=async (data)=>{
    const response=await fetch(URL_BASE+"/user/login",{
        method:"POST",
        headers:HEADERS,
        body:JSON.stringify(data)
    });
    return await  response.json();
}

export const getNewTokenUser=async (token)=>{
    HEADERS["access-x"]=`bearer ${token}`;
    const response=await fetch(URL_BASE+"/user/refress-token",{
        method:"GET",
        headers:HEADERS,
    });
    return response.json(); 
}
export const getAllUsers=async (accessToken)=>{
    const response=await fetch(URL_BASE+"/user",{
        method:"GET",
        headers:headersWithAccessToken(HEADERS,accessToken),
    });
    return await  response.json();
}