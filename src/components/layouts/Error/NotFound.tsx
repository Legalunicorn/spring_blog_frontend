import { Link } from "react-router";
import { Icon } from "@iconify/react/dist/iconify.js";
import "./error.scss"

const NotFound = () => {
    return (
        <div>
            <div className="error-page">

                <h1>
                    404 Page not found
                </h1>
                <span>
                    Lost in the digital wilderness? THis page couldn't find its way either. Head back to our <Link to={"/home"}>home page</Link>
                </span>
                <Icon icon="tdesign:search-error" width="90" height="90" />


                
            </div>
        </div>
    );
}

export default NotFound;