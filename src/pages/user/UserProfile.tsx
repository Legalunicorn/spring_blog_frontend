import { useParams } from "react-router";
import "./userProfile.scss"
import { useFetch } from "../../helpers/hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import { PostSummary } from "../../helpers/types";
import type { AuthorSummary } from "../../helpers/types";
import PostCard from "../../components/postCard/PostCard";

type UserProfile = {
    user: AuthorSummary,
    posts: PostSummary[]
}

const UserProfile = () => {

    const {username} = useParams();
    const myFetch = useFetch();


    const {
        data,
        isLoading,
        isError
    } = useQuery<UserProfile>({
        queryKey:["userProfile",username],
        queryFn: ()=>myFetch(`/users/${username}`)
    })

    if (isLoading) return <p>loading skibii</p>
    if (isError) return <p>Error skibidi</p>
    if (data==null) return <p>SKIBIDI</p>

    console.log(data);


    return (
        <div className="page profile-page">
            <section className="user-details">
                <img src={data.user.profilePicture} alt="" />
                <div>
                    <p>@{data.user.username}</p>
                    <p>{data.posts.length} posts</p>
                </div>
            </section>
            <p>Posts</p>
            <section className="user-posts">
            
                {data.posts && data.posts.map(post=>(
                    <PostCard post={post}/>
                ))}
            </section>

        </div>
    );
}
 
export default UserProfile;