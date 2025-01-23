

//Load the post from the backend

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";

import { PostPreviewableType, PostType } from "../../helpers/types";
import { useFetch } from "../../helpers/hooks/useFetch";
import { toast } from "react-toastify";
import ModifyPost from "../../components/createPost/ModifyPost";

const EditPost = () => {

    const queryClient = useQueryClient();
    const {postId} = useParams();
    const myFetch = useFetch();
    const navigate = useNavigate();

    const {data:post,isLoading,isError} = useQuery<PostType>({
        queryKey:["post",Number(postId)],
        queryFn:()=>myFetch(`/posts/${postId}`)
    })

    const EditPostMutation = useMutation({
        mutationFn:(postInput:PostPreviewableType)=>myFetch(`/posts/${postId}`,{
            method:"PATCH",
            body:JSON.stringify({
                ...postInput,
                tags:postInput.tags.map(tag=>tag.name)
            })
        }),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["feed"]});
            queryClient.invalidateQueries({queryKey:["posts"]});
            toast.success("Post Updated!")
            navigate(`/posts/${postId}`)            
        },
        onError:(error)=>{
            console.log(error)
            toast.error(error.message);
        }
    })

    
    if (isLoading) return <p>Loading...</p>;
    if (isError || !post) return <p>Error loading post</p>;

 

    return (
        <ModifyPost
            mutationFn={EditPostMutation}
            post={post}
        />
    );
}
 
export default EditPost;