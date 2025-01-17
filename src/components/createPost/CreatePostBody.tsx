import "./createPost.scss"
import type { createPostProps } from "./CreatePostMain"; 
import { Form } from "react-router";
import NextButton from "./NextButton";
import BackButton from "./BackButton";
import { Icon } from "@iconify/react/dist/iconify.js";


const CreatePostBody = ({ setPostInput, postInput,setEditMode }:createPostProps) => {


    // const [postBody,setPostBody] = useState<string>("");


    const handleChangeBody = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        // console.log(e.currentTarget.value)
        setPostInput({
            ...postInput,
            body: e.currentTarget.value
        })
    }

    return ( 
        <section className="create-post-body">
            <Form className="create-body-form">
                <label htmlFor="post-body">
                    <Icon icon="proicons:script" width="24" height="24" />
                    Body: </label>
                <textarea 
                    name="post-body" 
                    id=""
                    onChange={handleChangeBody}
                    value={postInput.body}
                    placeholder="Write your story.."
                >
                 </textarea> 
                <div className="direction-buttons">
                    <BackButton target="main" setEditMode={setEditMode}/>
                    <NextButton target="preview" setEditMode={setEditMode}/>
                </div>

            </Form>


        </section>
    );
}
 
export default CreatePostBody;