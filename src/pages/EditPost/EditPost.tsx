

//Load the post from the backend

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";

import { PostPreviewableType, PostType, User } from "../../helpers/types";
import { useFetch } from "../../helpers/hooks/useFetch";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../helpers/hooks/useAuthContext";
import { toast } from "react-toastify";
import ModifyPost from "../../components/createPost/ModifyPost";
import { PFP_DEFAULT } from "../../helpers/constants";

const EditPost = () => {

    const queryClient = useQueryClient();
    const {postId} = useParams();
    const myFetch = useFetch();
    const {user} = useAuthContext() as {user:User};
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

    
    // const post = data as 
    // if (user.username!=post.author.username){
    //     navigate("/home")
    // }
    // const [postInput, setPostInput] = useState<PostPreviewableType>({
    //     title: post?post.title:"",
    //     thumbnail:post? post.thumbnail:"",
    //     body: post?post.body:"",
    //     tags: post?post?.tags:[],
    //     like_count:post?post.like_count:0,
    //     author:{
    //         username: user? user.username: "demo",
    //         profilePicture: user && user.profilePicture? user.profilePicture: PFP_DEFAULT
    //     },
    //     createdOn: post?post.createdOn:new Date().toISOString()
    // })


    // if (isLoading || isError || data==null) return <p> Loading | Error </p>

    return (
        <ModifyPost
            mutationFn={EditPostMutation}
            post={post}
                
            // postInput={postInput}
            // setPostInput={setPostInput}
        />
    );
}
 
export default EditPost;