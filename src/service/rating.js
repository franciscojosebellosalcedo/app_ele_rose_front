import { HEADERS, URL_BASE } from "../constants/constants"
import { headersWithAccessToken } from "../helpers/helpers";

export const getAllRatings=async (accessToken)=>{
    const response=await fetch(URL_BASE+"/qualification",{
        method:"GET",
        headers:headersWithAccessToken(HEADERS,accessToken),
    });
    return await  response.json();
}