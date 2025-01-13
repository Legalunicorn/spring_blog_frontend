
const VITE_API_URL = "http://localhost:8080/api"

export const simpleFetch = async (
    url:string,
    options:any={}
)=>{
    const response = await fetch(VITE_API_URL+url,{
        mode:"cors",
        ...options
    })

    return response;
}
