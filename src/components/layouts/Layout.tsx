import { Outlet, useRouteError } from "react-router";
import { useAuthContext } from "../../helpers/hooks/useAuthContext";
import Header from "./Header";
import Footer from "./Footer";

/**
 * Main layout component for the app
 * - header
 * <Outlet> or <Children>
 * - footer 
 * 
 * @returns 
 */
const Layout = () => {

    const error = useRouteError();
    const { loading } = useAuthContext();


    return (
        <div id="main">
            <Header />
            {error
                ? <p> ERROR </p>
                :
                loading
                    ? "skibidi loading"
                    : <Outlet />
            }
            <Footer />
        </div>
    );
}

export default Layout;