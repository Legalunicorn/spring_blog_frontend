
import { useNavigate } from "react-router";
import { PostSummary, } from "../../helpers/types";
import "./postCard.scss"
import { Icon } from "@iconify/react/dist/iconify.js";
import { format } from "date-fns"
import { THUMBNAIL_DEFAULT,PFP_DEFAULT } from "../../helpers/constants";


type PostCardProps = {
    post: PostSummary
}

//TODO - create a second post card design, where its more square, with a big thumgnail on top following by the title below
const PostCard = ({ post }: PostCardProps) => {

    // if (post.thumbnail==null){
    if (post.thumbnail==="") post.thumbnail= THUMBNAIL_DEFAULT;
    // }
    const formattedDate = format(post.createdOn, "LLL yyyy");
    const navigate = useNavigate();

    const visitProfile =(e:React.MouseEvent<HTMLDivElement>)=>{
        e.stopPropagation();
        navigate(`/users/${post.author.username}`)
    }

    return (
        <article onClick={()=>navigate(`/posts/${post.id}`)} className="post-card">

            <div className="post-data">
                {post.draft && post.draft==true &&
                    <p className="draft-tag">Draft</p>
                }
                <section className="post-main">
                    <div className="post-author"
                        onClick={visitProfile}
                    >
                        <img className="pfp" src={post.author.profilePicture ? post.author.profilePicture : PFP_DEFAULT} alt="" />
                        <p>{post.author.username}</p>

                    </div>

                    <p  className="post-title">{post.title}</p>
                    <div className="post-tags">
                        {post.tags?.map((tag,idx) => (
                            <p key={idx} onClick={()=>navigate(`/tags/${tag.name}`)}>{tag.name}</p>
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
                        <p>{post.comment_count || 0}</p>
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