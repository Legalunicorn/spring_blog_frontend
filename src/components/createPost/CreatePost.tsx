import { Form, useNavigate } from "react-router";
import "./createPost.scss"
import { useState } from "react";
import CreatePostMain from "./CreatePostMain";
import ViewOptions from "./ViewOption";
import CreatePostBody from "./CreatePostBody";


//TODO create a wrapper for protected end points such as this one 
// export type PostInputType = {
//     title: string,
//     thumbnail: string,
//     body: string
//     tags: string[]
// }
import type { PostPreviewable } from "../../helpers/types";
import { useAuthContext } from "../../helpers/hooks/useAuthContext";
export type InputMode = "main" | "body" | "preview"

const CreatePost = () => {
    const {user} = useAuthContext();


    const navigate = useNavigate();
    const [postInput, setPostInput] = useState<PostPreviewable>({
        title: "",
        thumbnail: "",
        body: "",
        tags: [],
        like_count:0,
        author:{
            username:"Demo",
            profilePicture:"demo"
        }
    })

    const [editMode, setEditMode] = useState<InputMode>("body");


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
                : <p>hi</p>

            }
            <section className="saving-options">
                <button>Draft</button>
                <button>Post</button>
            </section>


        </div>
    );
}

export default CreatePost;

/*

two tables 


one 
- title
- tags 
- thumbnail


two 
- large area for boxy 
*/