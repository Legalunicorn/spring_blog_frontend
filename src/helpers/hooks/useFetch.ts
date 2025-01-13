import { useNavigate } from "react-router";
import { useAuthContext } from "./useAuthContext";


const VITE_API_URL = "http://localhost:8080/api"

export function useFetch(){

    const {user} = useAuthContext();
    const navigate = useNavigate();

    const handleFetch = async (
        url:string,
        options:any = {},
        include_content_type:boolean = true) =>{
        const headers:any = {}
        if (include_content_type){
            headers["Content-Type"]="application/json";
        }
        if (user){
            headers.Authorization = `Bearer ${user.token}`
        }

        const response = await fetch(VITE_API_URL+url,{
            headers: headers,
            mode:"cors",
            ...options,
        })

        const data:any = await response.json();

        if (response.ok){
            return data
        } else if (response.status==401){
            navigate("/auth/login");
            //Should I throw an error? no idea what it does //TODO 
            throw new Error("Authentication Invalid. Please Login/Register.")
        } else {
            console.log(`$ERR code: ${response.status}: ${data}`);
            throw new Error(data.error || 'Failed to fetch data');
        }
    }

    return handleFetch;
}
