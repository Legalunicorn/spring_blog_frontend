import "./createPost.scss"
// import type { InputMode } from "./CreatePost";
import { useState, useEffect, useRef } from "react";
import type { InputMode } from "./CreatePost";
import { Form } from "react-router";
import { Icon } from "@iconify/react/dist/iconify.js";
import NextButton from "./NextButton";
import type { PostPreviewableType } from "../../helpers/types";

export type createPostProps = {
    setPostInput: React.Dispatch<React.SetStateAction<PostPreviewableType>>,
    setEditMode: React.Dispatch<React.SetStateAction<InputMode>>;
    postInput: PostPreviewableType,
    // formRef: React.RefObject<HTMLFormElement>
}

const CreatePostMain = ({ setPostInput, postInput, setEditMode }: createPostProps) => {

    const [currentTag, setCurrentTag] = useState("");
    const tagInput = useRef<HTMLInputElement | null>(null);

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault(); //Bug where tag deletes upon creation because of form submissions 
            const tag_names = postInput.tags.map(tag=>tag.name.toLowerCase());
            // const duplicate = postInput.ta
            if (currentTag.length === 0 || postInput.tags.length >= 5 || tag_names.includes(currentTag.toLowerCase())) {
                setCurrentTag("");
                return;
            }
            // console.log("curr tag:", currentTag);
            //must check i fcontains
            


            setPostInput((prev) => ({
                ...prev,
                tags: [
                    ...prev.tags,
                    { name: currentTag.toLowerCase() }
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

    const changeURL = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostInput({
            ...postInput,
            thumbnail: e.currentTarget.value
        })
    }

    const changeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentTag(e.currentTarget.value);
    }

    const deleteTag = (tag: string) => {
        console.log("DELETING: ", tag);
        // deletes the value from PostInput.tags
        setPostInput(prev => ({
            ...prev,
            tags: prev.tags.filter(t => t.name !== tag)
        }))
    }



    return (
        <section className="create-post-main">
            <Form
                className="create-main-form"
                // ref={formRef}
            >
                <label htmlFor="title">
                    <Icon icon="tabler:bulb" width="16" height="16" />
                    Title ({postInput.title.length}/150)
                </label>
                <input
                    type="text"
                    name="title"
                    // required
                    minLength={1}
                    maxLength={150} //TODO change backend limit to 200
                    onChange={changeTitle}
                    value={postInput.title}
                    placeholder="eg. My favourite Cats"
                    title="BRO"


                />
                <label htmlFor="thumbnail">
                    <Icon icon="bx:image" />
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
                    <Icon icon="mdi:tag" />
                    Tags ({postInput.tags.length}/5)
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
                    {postInput.tags && postInput.tags.map(tag => (
                        <div className="added-tag">
                            <span>{tag.name}</span>
                            <button type="button"
                                onClick={() => deleteTag(tag.name)}
                            >
                                ✖
                            </button>
                        </div>
                    ))}

                </div>
                <div className="direction-buttons">
                    <NextButton
                        target="body"
                        setEditMode={setEditMode}
                        // formRef={formRef}
                    />

                </div>



            </Form>
        </section>
    );
}

export default CreatePostMain;