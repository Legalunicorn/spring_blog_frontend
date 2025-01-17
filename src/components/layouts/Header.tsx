import { useAuthContext } from "../../helpers/hooks/useAuthContext";
import "./layout.scss"
import logo from "../../assets/images/rice-bowl-logo.svg";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useNavigate } from "react-router";
const Header = () => {

    const {user} = useAuthContext();
    const navigate = useNavigate();



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
                    <p onClick={()=>navigate("/posts/create")}>x</p>
                    <Icon icon="iconamoon:profile-light" width="24" height="24" />
                    <Icon icon="material-symbols:logout" width="24" height="24" />
                </>
                :<>
                    <p onClick={()=>navigate("/posts/create")}>x</p>
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