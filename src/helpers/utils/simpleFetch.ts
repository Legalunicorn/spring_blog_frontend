import { VITE_API_URL } from "../constants";

export const simpleFetch = async (
    url:string,
    options:any={}
)=>{
    const param = {
        mode:"cors",
        ...options
    }
    console.log("p",param);
    const response = await fetch(VITE_API_URL+url,{
        mode:"cors",
        ...options
    })

    return response;
}

