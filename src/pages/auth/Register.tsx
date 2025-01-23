import "./auth.scss";
import { Form, Link, useNavigate, useSearchParams } from "react-router";
import logo from "../../assets/images/rice-bowl-logo.svg"
import { useState } from "react";
import { simpleFetch } from "../../helpers/utils/simpleFetch";
import { useAuthContext } from "../../helpers/hooks/useAuthContext";
import ErrorBox from "../../components/ErrorBox/ErrorBox";


type RegisterInputs = {
    username:string,
    password:string,
    confirm_password:string
}


const Register = () => {

    // const myFetch = useFetch();
    const {dispatch} = useAuthContext();

    const [inputs,setInputs] = useState<RegisterInputs>({username:"",password:"",confirm_password:""});
    const [loading,setLoading] = useState<boolean>(false);
    const [error,setError] = useState<string>("")
    const navigate = useNavigate();
    const [searchParams,setSearchParams] = useSearchParams();



    const handleRegister = async (e:React.FormEvent<HTMLFormElement>):Promise<void>=>{
        e.preventDefault();
                const {username,password,confirm_password} = inputs;
        if (password!==confirm_password){
            setError("Passwords do not match!");
            return;
        }
        setLoading(true);
        try{
            const response = await simpleFetch("/auth/register",{
                headers:{
                    "Content-Type":"application/json"
                },
                method:"POST",
                body: JSON.stringify({
                    username,
                    password
                })
            })
            const data = await response.json(); 
            console.log(data);
            setLoading(false);
            if (response.ok){
                dispatch({type:"LOGIN",payload:data})
                localStorage.setItem("user",JSON.stringify(data));
                const previous_page = searchParams.get("redirectTo");
                // if (previous_page!=null){
                //     navigate(previous_page);
                // } else {
                //     navigate("/home");
                // }
                
            }else{
                setError(data.message);
            }
        } catch(err:any){
            console.log("Failed to send request: Register");
            setLoading(false);
            setError(err.message)
        }
    }

    const handleChangePassword = (e:React.FormEvent<HTMLInputElement>)=>{
        const val:string = e.currentTarget.value;
        setInputs({...inputs,password:val});
        if (e.currentTarget.value!=inputs.confirm_password){
            setError("Passwords do not match!");
        } else{ setError("")};
    }

    const handleChangeConfirmPassword = (e:React.FormEvent<HTMLInputElement>)=>{
        const val:string = e.currentTarget.value;
        setInputs({...inputs,confirm_password:val});
        if (e.currentTarget.value!=inputs.password){
            setError("Passwords do not match!");
        } else setError("");
    }    

    return (
        <div className="page auth-page">
            <div className="backdrop">
                <div className="bd1"></div>
                <div className="bd2"></div>
                <div className="bd3"></div>
 
            </div>
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

                    <label htmlFor="confirm_password">Confirm Password: </label>
                    <input
                        type="password"
                        required 
                        minLength={2}
                        maxLength={50}
                        autoComplete="new-password"
                        name="confirm_password"
                        value={inputs.confirm_password}
                        onChange={handleChangeConfirmPassword}
                    />

                    <button className="auth-submit" type="submit">Sign up</button>
                    {error && 
                    <ErrorBox
                        message={error}
                    />
                    }
                </Form>
                <section>
                    <span>Already have an account? {" "}</span>
                    <Link to="/auth/login">Login here</Link>
                </section>

            </section>
        </div>

    );
}
 
export default Register;
