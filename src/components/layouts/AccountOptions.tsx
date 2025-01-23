import { useNavigate } from "react-router";
import "./layout.scss"
import { useAuthContext } from "../../helpers/hooks/useAuthContext";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { User } from "../../helpers/types";
import ConfirmModal from "../Modals/ConfirmModal";



const AccountOptions = () => {

    const navigate = useNavigate();
    const context = useAuthContext();
    const user = context.user as User; 
    const dispatch = context.dispatch;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isModalOpen,setIsModalOpen] = useState<boolean>(false);


    const handleLogout=()=>{
        dispatch({type:"LOGOUT"});
        localStorage.removeItem("user")
    }

    return (
        <div className="options-container">
            <img src={user.profilePicture} alt=""
                onClick={() => setIsOpen(prev => !prev)}
            />
            {isOpen &&
                <div className="user-options">
                    <p onClick={()=>navigate(`/users/${user.username}`)}>
                    <Icon icon="gg:profile" width="24" height="24" />
                    View Profile
                    </p>
                    <p onClick={()=>navigate("account/edit-profile")}>
                        <Icon icon="prime:user-edit" width="24" height="24" />
                        Edit Account
                    </p>
                    <p onClick={()=>navigate("account/drafts")}>
                        <Icon icon="ri:draft-line" width="24" height="24" />
                        View Drafts
                    </p>
                    <p onClick={()=>setIsModalOpen(prev=>!prev)}>
                        <Icon icon="material-symbols:logout" width="24" height="24" />
                        Logout
                    </p>
                </div>
            }
            {isModalOpen && 
                <ConfirmModal
                    text="Are you sure you want to Logout"
                    title="Logout"
                    onClose={()=>setIsModalOpen(false)}
                    onConfirm={handleLogout}
                />
            }
        </div>
    );
}

export default AccountOptions;