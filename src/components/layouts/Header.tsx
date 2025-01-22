import { useAuthContext } from "../../helpers/hooks/useAuthContext";
import "./layout.scss"
import logo from "../../assets/images/rice-bowl-logo.svg";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useNavigate } from "react-router";
import AccountOptions from "./AccountOptions";
const Header = () => {

    const {user,dispatch} = useAuthContext();
    const navigate = useNavigate();

    const handleLogout=()=>{
        dispatch({type:"LOGOUT"});
        localStorage.removeItem("user")
    }



    return (
        <section id="header">
            <div 
                onClick={()=>navigate("/home")}
            className="brand">
                <img src={logo} alt="" />
                <p>AlgoRice </p>

            </div>

            <div className="account">
                {user 
                ?<>
                    <Icon icon="famicons:create-outline" width="24" height="24" 
                        onClick={()=>navigate("/posts/create")}
                    />
                     <AccountOptions/>
                    {/* <Icon icon="material-symbols:logout" width="24" height="24" 
                        onClick={handleLogout}
                    /> */}
                </>
                :<>
                    <Link to={"/auth/register"}> Register</Link>
                    <p>{" | "}</p>
                    <Link to={"/auth/register"}> Login</Link>
                </>
                }
            </div>

        </section>
    );
}
 
export default Header;

/*
no user
- login 
- register 



user 
- profile 

*/