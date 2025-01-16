import { useAuthContext } from "../../helpers/hooks/useAuthContext";
import "./layout.scss"
import logo from "../../assets/images/rice-bowl-logo.svg";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router";
const Header = () => {

    const {user} = useAuthContext();



    return (
        <section id="header">
            <div className="brand">
                <img src={logo} alt="" />
                <p>AlgoRice </p>
            </div>

            <div className="account">
                {user 
                ?<>
                    <Icon icon="iconamoon:profile-light" width="24" height="24" />
                    <Icon icon="material-symbols:logout" width="24" height="24" />
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