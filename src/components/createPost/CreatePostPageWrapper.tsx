import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./createPost.scss"
import ModifyPost from "./ModifyPost";
import { useFetch } from "../../helpers/hooks/useFetch";

import { PostPreviewableType } from "../../helpers/types";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
const CreatePostPageWrapper = () => {
    const myFetch = useFetch()
    const queryClient = useQueryClient();
    const navigate = useNavigate();


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
        onError(error){
            console.log(error.message);
        }
    })



    return (
        <ModifyPost
            mutationFn={createPostMutation}
        />
     );
}
 
export default CreatePostPageWrapper;