import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./createPost.scss"
import ModifyPost from "./ModifyPost";
import { useFetch } from "../../helpers/hooks/useFetch";

import { PostPreviewableType } from "../../helpers/types";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuthContext } from "../../helpers/hooks/useAuthContext";
import { useState } from "react";
import { PFP_DEFAULT } from "../../helpers/constants";
const CreatePostPageWrapper = () => {
    const myFetch = useFetch()
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {user} = useAuthContext();
    
    const [postInput, setPostInput] = useState<PostPreviewableType>({
        title: "",
        thumbnail:"",
        body: "",
        tags: [],
        like_count:0,
        author:{
            username: user? user.username: "demo",
            profilePicture: user && user.profilePicture? user.profilePicture: PFP_DEFAULT
        },
        createdOn: new Date().toISOString()
    })



    const createPostMutation = useMutation({
        mutationFn:(postInput:PostPreviewableType)=>myFetch("/posts",{
            method:"POST",
            body: JSON.stringify({
                ...postInput,
                tags:postInput.tags.map(tag=>tag.name)
            }),
        }),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:["feed"]});
            queryClient.invalidateQueries({queryKey:["posts"]});
            toast.success("Post created!")
            navigate("/home")
        },
        onError(error,variables,context){
            console.log(error.message);
        }
    })



    return (
        <ModifyPost
            mutationFn={createPostMutation}
            // postInput={postInput}
            // setPostInput={setPostInput}
        />
     );
}
 
export default CreatePostPageWrapper;