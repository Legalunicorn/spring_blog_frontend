import { Form, useNavigate } from "react-router";
import "./createPost.scss"
import { useState,useRef } from "react";
import CreatePostMain from "./CreatePostMain";
import ViewOptions from "./ViewOption";
import CreatePostBody from "./CreatePostBody";
import { PFP_DEFAULT } from "../../helpers/constants";
import type { PostPreviewableType, User } from "../../helpers/types";
import { useAuthContext } from "../../helpers/hooks/useAuthContext";
import PreviewCreatePost from "./PreviewCreatePost";
import { useFetch } from "../../helpers/hooks/useFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
export type InputMode = "main" | "body" | "preview"


const CreatePost = () => {
    const {user}= useAuthContext() as {user:User}; //Auth validation
    // const {user} = useAuthContext();


    const navigate = useNavigate();
    const myFetch = useFetch();
    const queryClient = useQueryClient();
    const [postInput, setPostInput] = useState<PostPreviewableType>({
        title: "",
        thumbnail: "",
        body: "",
        tags: [],
        //Static variables for the sake of previewing 
        like_count:0,
        author:{
            username: user? user.username: "demo",
            profilePicture: user && user.profilePicture? user.profilePicture: PFP_DEFAULT
        },
        createdOn: new Date().toISOString()
    })

    const [editMode, setEditMode] = useState<InputMode>("body");

    const handleSubmit = async(e:React.FormEvent<HTMLButtonElement>,draft:boolean)=>{
        const data:any = postInput
        //Not needed for form submission
        delete data.author;
        delete data.like_count;
        delete data.createOn;
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
        createPostMutation.mutate(data)
    }

    // }
    const createPostMutation = useMutation({
        mutationFn:(postInput)=>myFetch("/posts",{
            method:"POST",
            body: JSON.stringify(postInput),
        }),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:["feed"]});
            toast.success("Post created!")
            navigate("/home")
        },
        onError(error,variables,context){
            console.log(error.message);
        }
    })


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
                    // formRef={mainFormRef}
                />
                :editMode=="body"
                ? <CreatePostBody
                    setPostInput={setPostInput}
                    postInput={postInput}
                    setEditMode={setEditMode}
                    // formRef={bodyFormRef}
                  />
                : <PreviewCreatePost
                     post={postInput}
                     
                  />

            }
            <section className="saving-options">
                <button
                    onClick={(e)=>handleSubmit(e,true)}
                >Draft</button>
                <button
                    onClick={(e)=>handleSubmit(e,false)}
                >Post</button>
            </section>


        </div>
    );
}

export default CreatePost;
