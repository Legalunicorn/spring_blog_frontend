import "./createPost.scss"
import type { InputMode } from "./CreatePost";
import { Icon } from "@iconify/react/dist/iconify.js";

type NextButtonProps = {
    setEditMode: React.Dispatch<React.SetStateAction<InputMode>>;
    target: InputMode,
    formRef?: React.RefObject<HTMLFormElement>
}
const NextButton = ({setEditMode,target,formRef}:NextButtonProps) => {

    const handleClick = ()=>{

        // if (formRef){
        //     e.preventDefault();
        //     if (formRef.current && formRef.current.checkValidity()){
                
        //         console.log("FAIL!",formRef.current)
        //         formRef.current.reportValidity();
        //         return;
        //     }
        //     //make sure form is validated
            
        // }
        setEditMode(target);
    }
    return ( 

        <button 
        className="next"
        onClick={handleClick}
    >
        
        Next
        <Icon icon="raphael:arrowright" width="21" height="21" />
    </button>
    );
}
 
export default NextButton;