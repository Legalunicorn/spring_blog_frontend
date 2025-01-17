
import { createBrowserRouter, Navigate } from "react-router"
import Register from "../../pages/auth/Register";
import Login from "../../pages/auth/Login";
import Home from "../../pages/home/Home";
import Layout from "../../components/layouts/Layout";
import PostMain from "../../components/postMain/PostMain";
import CreatePost from "../../components/createPost/CreatePost";
import { ProtectedRoute } from "./ProtectedRoute";
const router = createBrowserRouter([
    {
        path:"/auth",
        children:[
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"register",
                element:<Register/>
            }
        ]
    },
    {
        path:"/",
        element: <Layout/>,
        children:[
            {
                path:"",
                element: <Navigate to="/home"/>
            },
            {
                path:"home",
                element:<Home/>
            },
            {
                path:"posts/:postId",
                element:<PostMain/>
            },
            {
                element:<ProtectedRoute/>,
                children:[
                    {
                        path:"posts/create",
                        element:<CreatePost/>
                    }
                ]
            }
        ]
    }

])


export default router;

/*

rule 
: every page does not require authentication  (GET request API's)
-> but buttons (POST/DELETE..) wiill redirect to the login
-> redirect with a param redirectTo=""





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