import "./createPost.scss"

import type { InputMode } from "./CreatePost";


type ViewOptionsType={
    id: InputMode, // one of the InputModes
    state: string, //useState current value
    name:string, //name to inject to buttom 
    setState: React.Dispatch<React.SetStateAction<InputMode>>
}

const ViewOptions = ({
    id,
    state,
    name,
    setState
}:ViewOptionsType) => {
    

    return (

        <button
            onClick={()=>setState(id)}
            className={id==state?"option option-selected":"option"}
        >
            {name}
        </button>

    );
}
 
/*
We need 
state: if state 
 
/*
We need 
KEY: the "identity for this button"
STATE: the curent identity active 
setState: when we click we need to change it 
*/



export default ViewOptions;