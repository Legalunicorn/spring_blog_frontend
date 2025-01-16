import { useNavigate, useParams } from "react-router";
import "./postMain.scss"
import { useQuery } from "@tanstack/react-query";
import { PostType } from "../../helpers/types"; 
import { useFetch } from "../../helpers/hooks/useFetch";
import {format} from "date-fns";

//Should be able 


const PostMain = () => {
    const PFP_DEFAULT = "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
    const {postId} = useParams();
    const myFetch = useFetch();
    const navigate = useNavigate();
    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery<PostType>({
        queryKey:["post",postId],
        queryFn: ()=>myFetch(`/posts/${postId}`)
    })
    console.log(data);


    //TODO handle the loading properlty
    if (isLoading) return <>Loading</>;
    if (isError || data==undefined) return <>Error</>

    const formattedDate = format(data.createdOn,"LLL yyyy");

    return (
        <div className="post-page page">
            <section className="post-main">
                <p className="post-title">{data?.title}</p>
                <p>{formattedDate}</p>
                <div className="post-tags">
                        {data.tags?.map((tag)=>(
                            <p>{tag.name}</p>
                        ))}
                </div> 
                <div className="post-author" >
                        <img className="pfp" src={data.author.profile_picture? data.author.profile_picture:PFP_DEFAULT} alt="" />
                        <p>{data.author.username}</p>
                </div>
            </section>



        </div>
    );
}
 
export default PostMain;