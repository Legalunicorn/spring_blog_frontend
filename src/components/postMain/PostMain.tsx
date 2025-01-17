import { useNavigate, useParams } from "react-router";
import "./postMain.scss"
import { useQuery } from "@tanstack/react-query";
import { PostType } from "../../helpers/types";
import { useFetch } from "../../helpers/hooks/useFetch";
import { format } from "date-fns";
import Comment from "../Comment/Comment";
import { Icon } from "@iconify/react/dist/iconify.js";
import PostPreviewable from "./PostPreviewable";
import { PFP_DEFAULT,THUMBNAIL_DEFAULT } from "../../helpers/constants";

//Should be able 


const PostMain = () => {
    const { postId } = useParams();
    const myFetch = useFetch();
    const navigate = useNavigate();
    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery<PostType>({
        queryKey: ["post", postId],
        queryFn: () => myFetch(`/posts/${postId}`)
    })
    console.log(data);


    //TODO handle the loading properlty
    if (isLoading) return <>Loading</>;
    if (isError || data == undefined) return <>Error</>

    const formattedDate = format(data.createdOn, "Lo LLL yyyy");
    data.thumbnail = THUMBNAIL_DEFAULT;

    return (
        <div className="post-page page">
            <PostPreviewable data={data}/>
            <section className="post-comments">
                <div className="comments-header">
                    <span>Responses ({data.comments.length})</span>
                </div>
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