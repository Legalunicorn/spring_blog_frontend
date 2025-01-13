import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"


export const useAuthContext =() =>{
    const context = useContext(AuthContext);
    if (context==null){ //Default value
        throw new Error("Auth Context outside of scope/undefined");
    }
    return context
}