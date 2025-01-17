import { useNavigate, useParams } from "react-router";
import "./postMain.scss"
import { useQuery } from "@tanstack/react-query";
import { PostType } from "../../helpers/types";
import { useFetch } from "../../helpers/hooks/useFetch";
import { format } from "date-fns";
import Comment from "../Comment/Comment";
import { Icon } from "@iconify/react/dist/iconify.js";
import PostPreviewable from "./PostPreviewable";

//Should be able 


const PostMain = () => {
    const PFP_DEFAULT = "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";
    const DEFAULT_THUMBNAIL = "https://thumbs.dreamstime.com/b/rice-crop-symbol-rice-wheat-ears-design-element-agriculture-grain-colorful-vector-illustration-rice-crop-symbol-rice-wheat-129367791.jpg";
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
    data.thumbnail = DEFAULT_THUMBNAIL;

    return (
        <div className="post-page page">
            <PostPreviewable data={data}/>
            {/* <section className="post-main">
                <p className="post-title">{data?.title}</p>

                <div className="post-tags">
                    {data.tags?.map((tag) => (
                        <p>{tag.name}</p>
                    ))}
                </div>
                <div className="post-author" >
                    <div className="author">
                        <img className="pfp" src={data.author.profilePicture ? data.author.profilePicture : PFP_DEFAULT} alt="" />
                        <div>
                            <span>{data.author.username}</span>
                            <p>
                            <Icon width="20" icon="uit:calender"/>
                            <span>{formattedDate}</span>
                            </p>

                        </div>
                        
                    </div>
                    
                </div>
                <img src={data.thumbnail ? data.thumbnail : DEFAULT_THUMBNAIL} alt="" className="post-picture" />
            </section>
            <section className="post-body">
                {data.body}
            </section> */}
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