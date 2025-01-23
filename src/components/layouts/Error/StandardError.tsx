import { Icon } from "@iconify/react/dist/iconify.js";
import "./error.scss"
const StandardError = () => {
    return (
        <div>
            <div className="error-page">
                <h1>400 Bad Request</h1>
                <p>Oops... something went wrong.</p>
            </div>
        </div>
     );
}
 
export default StandardError;