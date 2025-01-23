import { useNavigate } from "react-router";
import { useAuthContext } from "./useAuthContext";


import { VITE_API_URL } from "../constants";

export function useFetch(){

    const {user} = useAuthContext();
    const navigate = useNavigate();

    // console.log("USER: ",user);

    const handleFetch = async (
        url:string,
        options:any = {},
        include_content_type:boolean = true) =>{
        const headers:any = {}
        if (include_content_type){
            headers["Content-Type"]="application/json";
        }
        if (user){
            console.log("there is a user");
            headers.Authorization = `Bearer ${user.token}`
        }
 

        const response = await fetch(VITE_API_URL+url,{
            headers,
            credentials:'include',
            mode:"cors",
            method:"GET",
            ...options,
        })



        // const data:any = await response.json();
        let data:any = null;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")){
            data = await response.json();
        }

        if (response.ok){
            return data
        
        } 
        else if (data.code=="JWT_ERROR"){
            
            navigate("/auth/login")
        }
        else if (response.status==401){
            navigate("/auth/login");
            // throw new Error("Authentication Invalid. Please Login/Register.")
        } else {
            console.log(`$ERR code: ${response.status}: ${data}`);
            throw new Error(data.message || 'Failed to fetch data');
        }
    }

    return handleFetch;
}
