import "./comment.scss"
import type { Comment } from "../../helpers/types";
import {format,formatDistanceToNow} from "date-fns";


type CommentProps  = {
    comment: Comment
}

const Comment = ({comment}:CommentProps) => {
    const PFP_DEFAULT = "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";
    // const formattedDate = formatDistanceToNow(comment.createdOn);
    const formattedDate = format(comment.createdOn,"Lo LLL yyyy");

    console.log(comment.author.profilePicture)
    return (
        <article className="comment-card">
            <div className="comment-author">
                <img src={comment.author.profilePicture} alt="" />
                <div className="comment-meta">
                    <p>{comment.author.username}</p>
                    <p>{formattedDate}</p>
                </div>

            </div>
            <div className="comment-body">
                {comment.body}
            </div>
        </article>
    );
}
 
export default Comment;