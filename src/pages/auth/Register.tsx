import "./auth.scss";
import {useFetch} from "../../helpers/hooks/useFetch"
import { Form } from "react-router";
import logo from "../../assets/images/rice-bowl-logo.svg"
import { useState } from "react";
import { simpleFetch } from "../../helpers/utils/simpleFetch";

const Register = () => {

    // const myFetch = useFetch();

    const [loading,setLoading] = useState<boolean>(false);
    const [error,setError] = useState<string>("")


    const handleRegister = async (e:React.FormEvent<HTMLInputElement>):Promise<void>=>{
        e.preventDefault();
        const response = await simpleFetch("/auth/register",{
            method:"POST",
            body: JSON.stringify({
                username: e.target.username.value,

            })
        })
    }



    return (
        <div className="page auth-page">
            <section className="form-container">
                <section>
                    <img className="logo" src={logo} alt="algorice-logo" />
                    <p>Welcome to Algorice</p>
                </section>
                <Form className="auth-form" onSubmit={handleRegister}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        pattern="[a-zA-Z0-9._]+"
                        required 
                        minLength={2}
                        maxLength={30}
                        autoComplete="new-password"
                        title="Only alphabets, numbers, underscore, and periods are allowed"
                        name="username"
                    />
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        required 
                        minLength={2}
                        maxLength={50}
                        autoComplete="new-password"
                        name="password"
                    />

                    <label htmlFor="confirm_password">Confirm Password: </label>
                    <input
                        type="password"
                        required 
                        minLength={2}
                        maxLength={50}
                        autoComplete="new-password"
                        name="confirm_password"
                    />

                    <button className="auth-submit" type="submit">Sign up</button>
                    
                </Form>
                <section>
                    <span>Already have an account? {" "}</span>
                    <a href="{}">Login here</a>
                </section>

            </section>
        </div>

    );
}
 
export default Register;

/*
{logo}
Welcome to AlgoRice 
username 
password
confirm password 
already have an account -> login



some conventions 

-> all pages except login register will have a layout with a global header

Login / Register pages
-> Their own style essentially 
*/