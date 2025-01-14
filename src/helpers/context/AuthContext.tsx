import { 
    useState,
    useEffect,
    useReducer,
    createContext,
 } from "react";

export interface User{
    username:string,
    token:string
}

// This is the type that our useReducer will mana
// The state of the userReducer is also passed inside the context as a global state
interface AuthState {
    user: User | null;
}

interface AuthContextValue extends AuthState {
    dispatch: React.Dispatch<AuthAction>,
    loading: boolean
}


 type AuthAction =
    | {type:"LOGIN";payload:User} //Define the payload to be a user 
    | {type:"LOGOUT"}

 export const AuthContext = createContext<AuthContextValue|undefined>(undefined);


 /**
  * 
  * @param state the previous state before the reducer was called
  * @param action JS object, by convention has a property named "type"
  * @returns returns the new state, in this case the AuthContext 
  */
 export const authReducer = (state:AuthState,action:AuthAction)=>{
    switch(action.type){
        case "LOGIN":{
            return {user:action.payload};
        }
        case "LOGOUT":{
            return {user: null}; //make the user null
        }
        default:
            return state;
    }
 }


 type AuthContextProviderProps = {
    children: React.ReactNode
 }



export const AuthContextProvider = ({children}:AuthContextProviderProps) =>{
    //This state has nothing to do with the context 
    const [state,dispatch] = useReducer(authReducer,{
        user:null
    })
    const [loading,setLoading] = useState<boolean>(true);

    useEffect(()=>{
        const user = localStorage.getItem("user");
        if (user){
            dispatch({type:"LOGIN",payload:JSON.parse(user)});
        }
        setLoading(false);
    },[]);

    return (
        <AuthContext.Provider value={{...state,dispatch,loading}}>
            {children}
        </AuthContext.Provider>
    )
}