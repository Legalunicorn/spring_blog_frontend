import "./createPost.scss"
import type { InputMode } from "./CreatePost";
import { Icon } from "@iconify/react/dist/iconify.js";

type BackButtonProps = {
    setEditMode: React.Dispatch<React.SetStateAction<InputMode>>;
    target: InputMode
}
const BackButton = ({setEditMode,target}:BackButtonProps) => {
    return ( 

        <button 
        className="next"
        onClick={()=>setEditMode(target)}
    >
        <Icon icon="raphael:arrowleft" width="21" height="21" />        
        Back
    </button>
    );
}
 
export default BackButton;