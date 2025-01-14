import { Icon } from "@iconify/react";
import "./errorBox.scss"

type ErrorBoxProps ={
    message:string
}

const ErrorBox = ({message}:ErrorBoxProps) => {
    return (
        <section className="error-box">
            <Icon 
                icon="material-symbols:error"
                height={25}
                width={25}
            />
            <p>{message}</p>
        </section>
    );
}
 
export default ErrorBox;