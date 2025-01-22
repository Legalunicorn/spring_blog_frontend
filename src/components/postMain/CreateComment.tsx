import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useAuthContext } from "../../helpers/hooks/useAuthContext";
import "./postMain.scss";
import { useState } from "react";
import { Form } from "react-router";
import TextareaAutosize from 'react-textarea-autosize';
import { useFetch } from "../../helpers/hooks/useFetch";
import { toast } from "react-toastify";

//we just need to pass the post ID



//props maybe just post ID?

//we
const CreateComment = ({postId}:{postId:number}) => {

    // const { user } = useAuthContext();
    const queryClient = useQueryClient();
    const [commentInput, setCommentInput] = useState<string>("");
    const myFetch = useFetch();

    console.log("postId given to create comment: ",postId)


    const createCommentMutation = useMutation({
        mutationFn:(commentInput:string)=>myFetch("/comments",{
            method:"POST",
            body:JSON.stringify({body: commentInput,post_id: postId})
        }),
        onSuccess:()=>{
            toast.success("Comment created!")
            setCommentInput("");
            console.log(["post",postId]);
            queryClient.invalidateQueries({queryKey:["post",postId]})
        },
        onError(error){
            toast.error(error.message);
        }
    })
   

    return (
        <div className="create-comment">
            <Form
                onSubmit={()=>createCommentMutation.mutate(commentInput)}
            >
                <TextareaAutosize
                    name="comment"
                    value={commentInput}
                    onChange={(e)=>setCommentInput(e.currentTarget.value)}
                    placeholder="Create a comment..."
                    minLength={1}
                    maxLength={500}
                    

                />
                <div>
                    <span>{commentInput.length}/500</span>
                    <button type="submit">Submit</button>
                </div>
                
            </Form>
        </div>
    );
}

export default CreateComment;