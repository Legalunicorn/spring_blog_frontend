import "./comment.scss"
import type { Comment } from "../../helpers/types";
import {format} from "date-fns";
import { PFP_DEFAULT } from "../../helpers/constants";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../helpers/hooks/useAuthContext";
import CommentOptions from "./CommentOptions";


type CommentProps  = {
    comment: Comment
}

const Comment = ({comment}:CommentProps) => {
    const formattedDate = format(comment.createdOn,"Lo LLL yyyy");
    const navigate = useNavigate();
    const {user} = useAuthContext();

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
            {comment.id && user && user.username==comment.author.username &&
                <CommentOptions
                    commentId={comment.id}
                    postId={comment.postId}
                />
            }
        </article>
    );
}
 
export default Comment;