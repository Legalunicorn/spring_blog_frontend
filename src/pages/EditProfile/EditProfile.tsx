import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFetch } from "../../helpers/hooks/useFetch";
import "./editProfile.scss"
import { Form, useNavigate } from "react-router";
import { useState } from "react";
import { useAuthContext } from "../../helpers/hooks/useAuthContext";
import { User } from "../../helpers/types";
import { toast } from "react-toastify";


const EditProfile = () => {

    const myFetch = useFetch();
    const {user} = useAuthContext() as {user:User};
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [url,setUrl] = useState<string>(user.profilePicture);

    const handleSubmit = ()=>{
        editProfileMutation.mutate(url);
    }

    const editProfileMutation = useMutation({
        mutationFn:(url:string)=>myFetch(`/users/${user.username}`,{
            method:"PATCH",
            body:JSON.stringify({profilePicture:url,username:user.username})
        }),
        onSuccess: ()=>{
            toast.success("Profile updated successfully");
            queryClient.invalidateQueries({queryKey:["post"]});
            queryClient.invalidateQueries({queryKey:["userProfile"]});
            queryClient.invalidateQueries({queryKey:["posts"]}); //HOME, POST by TAGS, USER PROFILE
            navigate(`/users/${user.username}`);
        },
        onError: (error)=>{
            toast.error(error.message);
        }
    })




    return (
        <div className="page edit-profile-page">
            <section className="page-header">
                Edit your profile, {user.username}
            </section>
            <section className="page-main">
                <Form onSubmit={handleSubmit}>
                    <label htmlFor="profile-picture">Profile Picture URL</label>
                    <input
                        name="profile-picture" 
                        type="text" 
                        placeholder="Profile picture URL" 
                        value={url}
                        onChange={(e)=>setUrl(e.currentTarget.value)}
                    />
                    <button type="submit">Save</button>
                </Form>
            </section>
        </div>
    );
}
 
export default EditProfile;


/*
Mutations: everything
1. feed
2. get usre profile
3. post page 
4. 
*/