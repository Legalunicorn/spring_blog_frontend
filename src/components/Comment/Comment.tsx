import "./comment.scss"
import type { Comment } from "../../helpers/types";
import {format,formatDistanceToNow} from "date-fns";
import { PFP_DEFAULT } from "../../helpers/constants";
import { useNavigate } from "react-router";


type CommentProps  = {
    comment: Comment
}

const Comment = ({comment}:CommentProps) => {
    // const formattedDate = formatDistanceToNow(comment.createdOn);
    const formattedDate = format(comment.createdOn,"Lo LLL yyyy");
    const navigate = useNavigate();

    console.log(comment.author.profilePicture)
    return (
        <article className="comment-card">
            <div className="comment-author">
                <img src={comment.author.profilePicture?comment.author.profilePicture:PFP_DEFAULT} alt="" />
                <div className="comment-meta">
                    <p
                        onClick={()=>navigate(`/users/${comment.author.username}`)}
                    >{comment.author.username}</p>
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