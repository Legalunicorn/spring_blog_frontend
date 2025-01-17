import "./postMain.scss"
import type { PostType } from "../../helpers/types";
import {format} from "date-fns";
import { Icon } from "@iconify/react/dist/iconify.js";

import type { PostPreviewableType } from "../../helpers/types";

// type PostPreviewableType = {
//     data: PostType
// }

type props ={
    data: PostPreviewableType
}

const PostPreviewable = ({data}:props) => {

    const formattedDate = format(data.createdOn, "Lo LLL yyyy");
    const PFP_DEFAULT = "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";
    const DEFAULT_THUMBNAIL = "https://thumbs.dreamstime.com/b/rice-crop-symbol-rice-wheat-ears-design-element-agriculture-grain-colorful-vector-illustration-rice-crop-symbol-rice-wheat-129367791.jpg";
    return (
        <>
            <section className="post-main">
                <p className="post-title">{data?.title}</p>

                <div className="post-tags">
                    {data.tags?.map((tag) => (
                        <p>{tag.name}</p>
                    ))}
                </div>
                <div className="post-author" >
                    <div className="author">
                        <img className="pfp" src={data.author.profilePicture ? data.author.profilePicture : PFP_DEFAULT} alt="" />
                        <div>
                            <span>{data.author.username}</span>
                            <p>
                            <Icon width="20" icon="uit:calender"/>
                            <span>{formattedDate}</span>
                            </p>

                        </div>
                        
                    </div>                    
                    
                </div>
                <img src={data.thumbnail ? data.thumbnail : DEFAULT_THUMBNAIL} alt="" className="post-picture" />
            </section>      
            <section className="post-body">
                {data.body}
            </section>              
        </>
    );
}
 
export default PostPreviewable;