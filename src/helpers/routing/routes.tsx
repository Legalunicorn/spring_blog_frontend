
import { createBrowserRouter } from "react-router"
import Register from "../../pages/auth/Register";
const router = createBrowserRouter([
    {
        path:"/auth",
        children:[
            {
                path:"login",
                element:"login-"
            },
            {
                path:"register",
                element:<Register/>
            }
        ]
    },
    {
        path:"/",
        children:[
            {
                path:"home",
                element:"-home-"
            },
        ]
    }

])


export default router;

/*

RULE: everything requires authentication, except sign up and login



----
HOME - feed 
POST/:POSTID - post information 
USER/:USERNAME - user information 
TAGS/TAGNAME - tag information
----
POST/CREATE - static page 
POST/UPDATE - 
----
AUTH/LOGIN 
AUTH/SIGNUP

ABOUT 
*/