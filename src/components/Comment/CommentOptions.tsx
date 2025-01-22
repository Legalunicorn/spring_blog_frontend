import {  useMutation, useQueryClient } from "@tanstack/react-query";
import "./comment.scss"
import { useFetch } from "../../helpers/hooks/useFetch";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import ConfirmModal from "../Modals/ConfirmModal";



const CommentOptions = (
    {commentId,postId}:{commentId:number,postId:number}
) => {

    const queryClient = useQueryClient();
    const myFetch = useFetch();
    const deleteCommentMutation = useMutation({
        mutationFn:()=>myFetch(`/comments/${commentId}`,{method:"DELETE"}),
        onSuccess:()=>{
            console.log("post ID: ",postId)
            queryClient.invalidateQueries({queryKey:["post",Number(postId)]});
            toast.success("Comment deleted successfully");
        },
        onError:()=>{
            toast.error("Failed to delete comment");
        }
    })
    const [isOptionsOpen,setIsOptionsOpen] = useState<boolean>(false);
    const [isModalOpen,setIsModalOpen] = useState<boolean>(false);
    return (
        <div className="comment-options">
            <Icon icon="mi:options-vertical"
                width="20"
                height="20"
                onClick={()=>setIsOptionsOpen(prev=>!prev)}
            />
            {isOptionsOpen && 
            <div className="options-container">
                <p onClick={()=>setIsModalOpen(prev=>!prev)}>
                    <Icon icon="mdi:trash-outline" height="20" width="20"/>
                    Delete
                </p>
            </div>
            }
            {isModalOpen && 
                <ConfirmModal
                    text="Are you sure you want to delete this comment?"
                    title="Delete comment"
                    onClose={()=>{setIsModalOpen(false)}}
                    onConfirm={()=>{deleteCommentMutation.mutate()}}
                />
            }
        </div>
    );
}
 
export default CommentOptions;