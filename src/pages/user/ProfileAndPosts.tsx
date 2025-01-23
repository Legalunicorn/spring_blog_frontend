import "./userProfile.scss"
import { AuthorSummary,PostSummary } from "../../helpers/types";
import PostCard from "../../components/postCard/PostCard";

type UserProfile = {
    user: AuthorSummary,
    posts: PostSummary[],
    label?: string
}



const ProfileAndPosts = ({user,posts,label="Posts"}:UserProfile) => {
    return (

        <div className="page profile-page">
            <section className="user-details">
                <img src={user.profilePicture} alt="" />
                <div>
                    <p>@{user.username}</p>
                    <p>{posts.length} posts</p>
                </div>
            </section>
            <p>{label}</p>
            <section className="user-posts">

                {posts && posts.map(post => (
                    <PostCard post={post} />
                ))}
            </section>

        </div>
    );
}

export default ProfileAndPosts;