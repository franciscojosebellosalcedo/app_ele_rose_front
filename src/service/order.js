import { HEADERS, URL_BASE } from "../constants/constants"
import { headersWithAccessToken } from "../helpers/helpers";

export const getOrderByIDAndByUser=async (accessToken,idOrder)=>{
    const response=await fetch(URL_BASE+`/order/${idOrder}`,{
        method:"GET",
        headers:headersWithAccessToken(HEADERS,accessToken),
    });
    return await  response.json();
}
export const getAllOrders=async (accessToken)=>{
    const response=await fetch(URL_BASE+"/order",{
        method:"GET",
        headers:headersWithAccessToken(HEADERS,accessToken),
    });
    return await  response.json();
}

export const changeStatusOrder=async (accessToken,statusOrder,id)=>{
    const response=await fetch(URL_BASE+`/order/${id}`,{
        method:"PUT",
        headers:headersWithAccessToken(HEADERS,accessToken),
        body:JSON.stringify({statusOrder})
    });
    return await  response.json();
}