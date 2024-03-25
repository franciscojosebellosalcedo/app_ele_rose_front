import { HEADERS, URL_BASE } from "../constants/constants"
import { headersWithAccessToken } from "../helpers/helpers";

export const getAllClients=async (accessToken)=>{
    const response=await fetch(URL_BASE+"/user/clients",{
        method:"GET",
        headers:headersWithAccessToken(HEADERS,accessToken),
    });
    return await  response.json();
}