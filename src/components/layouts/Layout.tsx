import { Outlet, useRouteError } from "react-router";
import { useAuthContext } from "../../helpers/hooks/useAuthContext";
import Header from "./Header";
import Footer from "./Footer";
import NotFound from "./Error/NotFound";
import StandardError from "./Error/StandardError";

/**
 * Main layout component for the app
 * - header
 * <Outlet> or <Children>
 * - footer 
 * 
 * @returns 
 */
const Layout = () => {

    const error:any = useRouteError();
    const status = error?.status;
    const { loading } = useAuthContext();
    

    return (
        <div id="main">
            <Header />
            {error
                ? (
                    <div className="page">
                        {status == 404 ? <NotFound/> : <StandardError/> }
                    </div>
                )
                : loading
                    ? "skibidi loading"
                    : <Outlet />
            }
            <Footer />
        </div>
    );
}

export default Layout;