//Use a mini model to open and close 
import "./postMain.scss"
import { Icon } from "@iconify/react/dist/iconify.js";

//allow the authorized users to update or delete posts 

import type { PostPreviewableType } from "../../helpers/types";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ConfirmModal from "../Modals/ConfirmModal";
import { useFetch } from "../../helpers/hooks/useFetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
type OptionProps = {
    post: PostPreviewableType
}

const PostOptions = ({ post }: OptionProps) => {
    //This should only be renreder for live posts  


    const [isDeleteModalOpen,setIsDeleteModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const myFetch = useFetch();


    const handleDelete=()=>{
        //Create a cancl-confirm model 
        console.log("hi")
        setIsDeleteModalOpen(prev=>!prev);
        // takes


    }

    const deletePostMutation = useMutation({
        mutationFn:()=>myFetch(`/posts/${post.id}`,{
            method:"DELETE"
        }),
        onSuccess:()=>{
            //Invalidate: [posts], [userProfile],[post,Id],
            toast.success("Your post has been deleted")
            queryClient.invalidateQueries({queryKey:["posts"]})
            queryClient.invalidateQueries({queryKey:["userProfile",post.author.id]})
            queryClient.invalidateQueries({queryKey:["posts",post.id]})
            navigate("/home")
        },
        onError:(error)=>{
            toast.error(error.message);
            console.log(error);
        }
    })


    return (
        <div className="post-options">
            <Icon icon="mi:options-vertical" height="24" width="24"
                onClick={()=>setIsOpen(prev=>!prev)}
            />
            {isOpen && 
                <div className="option-box">
                    <p onClick={()=>navigate(`/posts/${post.id}/edit`)}>
                    <Icon icon="mdi:edit-outline" width="22" height="22"
                        
                     />
                        Edit
                    </p>
                    <p onClick={handleDelete}>
                    <Icon icon="material-symbols-light:delete-outline-sharp" width="22" height="22"
                        
                     />
                        Delete
                    </p>
                </div>
            }
            {isDeleteModalOpen && post.id!=undefined
            && <ConfirmModal
                onClose={()=>setIsDeleteModalOpen(false)}
                onConfirm={()=>deletePostMutation.mutate()}
                title="Delete Post"
                text="Are you sure you want to delete this post?"
                />
            }
        </div>
    );
}

export default PostOptions;