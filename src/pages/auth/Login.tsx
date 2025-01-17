import "./auth.scss";
import { Form, Link, useNavigate } from "react-router";
import logo from "../../assets/images/rice-bowl-logo.svg"
import { useState } from "react";
import { simpleFetch } from "../../helpers/utils/simpleFetch";
import { useAuthContext } from "../../helpers/hooks/useAuthContext";
import ErrorBox from "../../components/ErrorBox/ErrorBox";


type LoginInputs = {
    username:string,
    password:string,
}


const Login = () => {

    // const myFetch = useFetch();
    const {dispatch} = useAuthContext();
    const navigate = useNavigate();

    const [inputs,setInputs] = useState<LoginInputs>({username:"",password:""});
    const [loading,setLoading] = useState<boolean>(false);
    const [error,setError] = useState<string>("")



    const handleRegister = async (e:React.FormEvent<HTMLFormElement>):Promise<void>=>{
        e.preventDefault();
        const {username,password} = inputs;
        setError("");
        setLoading(true);
        try{
            const response = await simpleFetch("/auth/login",{
                headers:{
                    "Content-Type":"application/json"
                },
                method:"POST",
                body: JSON.stringify({
                    username,
                    password
                })
            })
            console.log(response);
            const data = await response.json(); 
            console.log("data: ",data);
            setLoading(false);
            if (response.ok){
                console.log("HII")
                dispatch({type:"LOGIN",payload:data})
                localStorage.setItem("user",JSON.stringify(data));
                navigate("/home")
            }else{
                setError(data.message);
                console.log(data.message);
            }
        } catch(err:any){
            console.log("Failed to send request: Register");
            setLoading(false);
            console.log(err);
            setError(err.message)
        }
    }

    const handleChangePassword = (e:React.FormEvent<HTMLInputElement>)=>{
        const val:string = e.currentTarget.value;
        setInputs({...inputs,password:val});

    }

    return (
        <div className="page auth-page">
            <div className="backdrop">
                <div className="bd1">
                </div>
                <div className="bd2"></div>
                <div className="bd3"></div> 
            </div>
            {/* <img className="background-pattern" src={logo} alt="" /> */}
            <section className="form-container">
                <section>
                    <img className="logo" src={logo} alt="algorice-logo" />
                    <p>Welcome Back!</p>
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
                        value={inputs.username}
                        onChange={(e)=>setInputs({...inputs,username:e.currentTarget.value})}
                        
                    />

                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        required 
                        minLength={2}
                        maxLength={50}
                        autoComplete="new-password"
                        name="password"
                        value={inputs.password}
                        onChange={handleChangePassword}
                        title=""
                    />


                    <button className="auth-submit" type="submit">Login</button>
                    {error && 
                    <ErrorBox
                        message={error}
                    />
                    }
                </Form>
                <section>
                    <span>Don't have an account? {" "}</span>
                    <Link to="/auth/register">Register here</Link>
                </section>

            </section>
        </div>

    );
}
 
export default Login;
