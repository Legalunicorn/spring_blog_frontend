
import { useNavigate } from "react-router";
import { PostSummary, } from "../../helpers/types";
import "./postCard.scss"
import { Icon } from "@iconify/react/dist/iconify.js";
import { format } from "date-fns"


type PostCardProps = {
    post: PostSummary
}

//TODO - create a second post card design, where its more square, with a big thumgnail on top following by the title below
const PostCard = ({ post }: PostCardProps) => {
    // if (post.thumbnail==null){
    post.thumbnail = "https://thumbs.dreamstime.com/b/rice-crop-symbol-rice-wheat-ears-design-element-agriculture-grain-colorful-vector-illustration-rice-crop-symbol-rice-wheat-129367791.jpg"
    // }

    const PFP_DEFAULT = "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
    const formattedDate = format(post.createdOn, "LLL yyyy");
    const navigate = useNavigate();

    return (
        <article onClick={()=>navigate(`/posts/${post.id}`)} className="post-card">

            <div className="post-data">
                <section className="post-main">
                    <div className="post-author" >
                        <img className="pfp" src={post.author.profilePicture ? post.author.profilePicture : PFP_DEFAULT} alt="" />
                        <p>{post.author.username}</p>

                    </div>

                    <p  className="post-title">{post.title}</p>
                    <div className="post-tags">
                        {post.tags?.map((tag) => (
                            <p>{tag.name}</p>
                        ))}
                    </div>
                </section>
                <section className="post-meta">
                    <div>
                        <Icon
                            icon="stash:thumb-up-light"
                            width="21"
                            height="21"
                        />
                        <p>{post.like_count}</p>
                    </div>
                    <div>
                        <Icon icon="system-uicons:speech-bubble" width="21" height="21" />
                        <p>1</p>
                    </div>
                    <div className="post-date">
                        <Icon icon="uit:calender" width="21" height="21" />
                        <p>{formattedDate}</p>
                    </div>
                </section>
            </div>
            <img src={post.thumbnail} alt="thumbnail" />
        </article>
    );
}

export default PostCard;