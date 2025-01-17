import "./createPost.scss"
// import type { InputMode } from "./CreatePost";
import { useState,useEffect, useRef } from "react";
import type {InputMode } from "./CreatePost";
import { Form } from "react-router";
import { Icon } from "@iconify/react/dist/iconify.js";
import NextButton from "./NextButton";
import type { PostPreviewable } from "../../helpers/types";

export type createPostProps = {
    setPostInput: React.Dispatch<React.SetStateAction<PostPreviewable>>,
    setEditMode:React.Dispatch<React.SetStateAction<InputMode>>;
    postInput: PostPreviewable
}

const CreatePostMain = ({ setPostInput, postInput,setEditMode }: createPostProps) => {

    const [currentTag,setCurrentTag] = useState("");
    const tagInput = useRef<HTMLInputElement|null>(null);

    function handleKeyDown(e:React.KeyboardEvent<HTMLInputElement>){
        if (e.key==='Enter'){
            e.stopPropagation();
            e.preventDefault(); //Bug where tag deletes upon creation because of form submissions 
            console.log(postInput.tags)
            // const duplicate = postInput.ta
            if (currentTag.length === 0 || postInput.tags.length>=5){
                setCurrentTag("");
                return;
            }
            console.log("curr tag:" , currentTag);

            setPostInput((prev)=>({
                ...prev,
                tags:[
                    ...prev.tags,
                    {name:currentTag}
                ]
            }))
            setCurrentTag("");
        }
    }

    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostInput({
            ...postInput,
            title: e.currentTarget.value
        })
    }

    const changeURL = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setPostInput({
            ...postInput,
            thumbnail: e.currentTarget.value
        })
    }

    const changeTag = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setCurrentTag(e.currentTarget.value);
    }

    const deleteTag = (tag:string)=>{
        console.log("DELETING: ",tag);
        // deletes the value from PostInput.tags
        setPostInput(prev=>({
            ...prev,
            tags:prev.tags.filter(t=>t.name!==tag)
        }))
    }



    return (
        <section className="create-post-main">
            <Form className="create-main-form">
                <label htmlFor="title">
                    <Icon icon="tabler:bulb" width="16" height="16" />
                    Title:
                </label>
                <input
                    type="text"
                    name="title"
                    minLength={1}
                    maxLength={200} //TODO change backend limit to 200
                    onChange={changeTitle}
                    value={postInput.title}
                    placeholder="eg. My favourite Cats"


                />
                <label htmlFor="thumbnail">
                    <Icon icon="bx:image"/>
                    Image URL
                </label>
                <input 
                    name="thumbnail" 
                    type="url" 
                    minLength={1}
                    onChange={changeURL}
                    value={postInput.thumbnail}
                    placeholder="eg. www.picture-url.png"
                />

                <label htmlFor="tags">
                    <Icon icon="mdi:tag"/>
                    Tags (optional)
                </label>
                <input 
                    ref={tagInput}
                    type="text"
                    name="tags"
                    onChange={changeTag}
                    value={currentTag}    
                    onKeyDown={handleKeyDown}
                    placeholder="Press 'Enter' to add the input"
                />
                <div className="added-tags">
                    {postInput.tags && postInput.tags.map(tag=>(
                            <div className="added-tag">
                                <span>{tag.name}</span>
                                <button type="button"
                                    onClick={()=>deleteTag(tag.name)}
                                >
                                    ✖
                                </button>
                            </div>
                    ))}

                </div>
                <div className="direction-buttons">
                    <NextButton target="body" setEditMode={setEditMode}/>
                </div>
                

                
            </Form>
        </section>
    );
}

export default CreatePostMain;