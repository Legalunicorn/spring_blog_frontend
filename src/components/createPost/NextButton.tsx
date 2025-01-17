import "./createPost.scss"
import type { InputMode } from "./CreatePost";
import { Icon } from "@iconify/react/dist/iconify.js";

type NextButtonProps = {
    setEditMode: React.Dispatch<React.SetStateAction<InputMode>>;
    target: InputMode
}
const NextButton = ({setEditMode,target}:NextButtonProps) => {
    return ( 

        <button 
        className="next"
        onClick={()=>setEditMode(target)}
    >
        
        Next
        <Icon icon="raphael:arrowright" width="21" height="21" />
    </button>
    );
}
 
export default NextButton;