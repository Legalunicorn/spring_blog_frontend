import { useParams } from "react-router";
import "./postByTags.scss"
import { useQuery } from "@tanstack/react-query";
import { useFetch } from "../../helpers/hooks/useFetch";
import { PostSummary } from "../../helpers/types";
import PostCard from "../../components/postCard/PostCard";
import Loader from "../../components/loader/Loader";
import StandardError from "../../components/layouts/Error/StandardError";

type ReseponseType = {
    id: number,
    name:string,
    posts: PostSummary[]
}

const PostByTags = () => {

    const {tagName} = useParams();
    const myFetch = useFetch();
    const {data,isLoading,isError} = useQuery<ReseponseType>({
        queryKey:["posts","tags",tagName],
        queryFn:()=>myFetch(`/tags/${tagName}/posts`)
    })

    if (isLoading) return <Loader loading={isLoading}/>
    if (isError || data == undefined) return <StandardError/>

    return (
        <div className="post-by-tags-page page">
            <section className="page-header">
                <p>Posts with Tag "{tagName}" - ({data?.posts.length}) results</p>
            </section>
            <section>
                {data && data.posts.map(post=>(
                    <PostCard post={post} key={post.id}/>
                ))}
            </section>
        </div>

    );
}
 
export default PostByTags;