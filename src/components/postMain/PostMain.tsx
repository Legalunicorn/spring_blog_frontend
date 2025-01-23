import { useParams } from "react-router";
import "./postMain.scss"
import { useQuery } from "@tanstack/react-query";
import { PostType } from "../../helpers/types";
import { useFetch } from "../../helpers/hooks/useFetch";
import Comment from "../Comment/Comment";
import PostPreviewable from "./PostPreviewable";
import {THUMBNAIL_DEFAULT } from "../../helpers/constants";
import CreateComment from "./CreateComment";
import { useAuthContext } from "../../helpers/hooks/useAuthContext";
import StandardError from "../layouts/Error/StandardError";
import Loader from "../loader/Loader";

//Should be able 


const PostMain = () => {
    var { postId } = useParams();
    const myFetch = useFetch();
    const {user} = useAuthContext();
    const {
        data,
        isLoading,
        isError,
    } = useQuery<PostType>({
        queryKey: ["post", Number(postId)],
        queryFn: () => myFetch(`/posts/${postId}`)
    })


    //TODO handle the loading properlty
    if (isLoading) return <Loader loading={isLoading}/>
    if (isError || data == undefined) return <StandardError/>

    if (data.thumbnail==""){
        data.thumbnail = THUMBNAIL_DEFAULT;
    }

    return (
        <div className="post-page page">
            <PostPreviewable
                data={data}
                isLive={true}
                isDrafted={data?.draft}
            />
            {/* Add a response if neeeded */}

            <section className="post-comments">
                <div className="comments-header">
                    <span>Responses ({data.comments.length})</span>
                </div>
                {user?
                
                
                <CreateComment
                postId={Number(postId)}
                />
                :<p>(Login to create responses.)</p>
                }      
                <div className="comments-container">
                    {data.comments && data.comments.map(comment =>
                        <Comment comment={comment} />
                    )}
                </div>
            </section>



        </div>
    );
}

export default PostMain;