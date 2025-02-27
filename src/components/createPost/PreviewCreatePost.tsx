import "./createPost.scss"
import type { PostPreviewableType } from "../../helpers/types";
import PostPreviewable from "../postMain/PostPreviewable";



const PreviewCreatePost = ({post}:{post:PostPreviewableType}) => {
    return ( 
        <div className="post-preview">
            <PostPreviewable
                data={post}
                isLive={false}
            />
        </div>

    );
}
 
export default PreviewCreatePost;