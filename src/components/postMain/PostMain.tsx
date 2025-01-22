import { useNavigate, useParams } from "react-router";
import "./postMain.scss"
import { useQuery } from "@tanstack/react-query";
import { PostType } from "../../helpers/types";
import { useFetch } from "../../helpers/hooks/useFetch";
// import { format } from "date-fns";
import Comment from "../Comment/Comment";
// import { Icon } from "@iconify/react/dist/iconify.js";
import PostPreviewable from "./PostPreviewable";
import {THUMBNAIL_DEFAULT } from "../../helpers/constants";
import CreateComment from "./CreateComment";
import { useAuthContext } from "../../helpers/hooks/useAuthContext";

//Should be able 


const PostMain = () => {
    var { postId } = useParams();
    const myFetch = useFetch();
    const navigate = useNavigate();
    const {user} = useAuthContext();
    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery<PostType>({
        queryKey: ["post", Number(postId)],
        queryFn: () => myFetch(`/posts/${postId}`)
    })
    // console.log(data);


    //TODO handle the loading properlty
    if (isLoading) return <>Loading</>;
    if (isError || data == undefined) return <>Error</>

    

    // const formattedDate = format(data.createdOn, "Lo LLL yyyy");
    // data.thumbnail = THUMBNAIL_DEFAULT;
    if (data.thumbnail==""){
        data.thumbnail = THUMBNAIL_DEFAULT;
    }

    console.log("post main data: ",data)

    return (
        <div className="post-page page">
            <PostPreviewable
                data={data}
                isLive={true}
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