import "./createPost.scss"
import { useState } from "react";
import CreatePostMain from "./CreatePostMain";
import ViewOptions from "./ViewOption";
import CreatePostBody from "./CreatePostBody";
import { PFP_DEFAULT } from "../../helpers/constants";
import type { PostPreviewableType, PostSummary, User } from "../../helpers/types";
import { useAuthContext } from "../../helpers/hooks/useAuthContext";
import PreviewCreatePost from "./PreviewCreatePost";
import { UseMutationResult } from "@tanstack/react-query";
import { toast } from "react-toastify";
export type InputMode = "main" | "body" | "preview"


type CreatePostProps = {
    post?: PostSummary,
    mutationFn: UseMutationResult<any, Error, PostPreviewableType, unknown>,
    
}

const ModifyPost = ({
    post,
    mutationFn,
}:CreatePostProps) => {
    const {user}= useAuthContext() as {user:User}; //Auth validation

    const [postInput, setPostInput] = useState<PostPreviewableType>({
        title: post? post.title:"",
        thumbnail:post? post.thumbnail:"",
        body: post?post.body:"",
        tags: post?post?.tags:[],
        like_count:post?post.like_count:0,
        author:{
            username: user? user.username: "demo",
            profilePicture: user && user.profilePicture? user.profilePicture: PFP_DEFAULT
        },
        createdOn: post?post.createdOn:new Date().toISOString()
    })

    const [editMode, setEditMode] = useState<InputMode>("body");

    const handleSubmit = async(draft:boolean)=>{
        const data:any = postInput
        //Not needed for form submission
        delete data.author;
        delete data.like_count;
        delete data.createdOn;
        data.draft = draft;

        //Validation
        if (data.title.length==0 || data.title.length>=150){
            toast.error("Title must be between 1-150 characters");
            return;
        }
        if (data.body.length==0){
            toast.error("Body must not be empty!")
            return;
        }
        if (data.body.length>50000){
            toast.error("Post body must not exceed 50,000!");
            return;
        }
        // createPostMutation.mutate(data)
        mutationFn.mutate(data);
    }


    return (
        <div className="page create-post-page">

            <div className="create-post-options">
  
                <ViewOptions id="main" name="Main" state={editMode} setState={setEditMode}/>
                <ViewOptions id="body" name="Body" state={editMode} setState={setEditMode}/>
                <ViewOptions id="preview" name="Preview" state={editMode} setState={setEditMode}/>
            </div>
            {
                editMode=="main"
                ?<CreatePostMain
                    setPostInput={setPostInput}
                    postInput={postInput}
                    setEditMode={setEditMode}
                />
                :editMode=="body"
                ? <CreatePostBody
                    setPostInput={setPostInput}
                    postInput={postInput}
                    setEditMode={setEditMode}
                  />
                : <PreviewCreatePost
                     post={postInput}
                     
                  />

            }
            <section className="saving-options">
                <button
                    onClick={()=>handleSubmit(true)}
                >Draft</button>
                <button
                    onClick={()=>handleSubmit(false)}
                >Post</button>
            </section>


        </div>
    );
}

export default ModifyPost;
