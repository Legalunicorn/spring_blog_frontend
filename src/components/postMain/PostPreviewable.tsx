import "./postMain.scss"
import type { PostType } from "../../helpers/types";
import { format } from "date-fns";
import { Icon } from "@iconify/react/dist/iconify.js";

import type { PostPreviewableType } from "../../helpers/types";
import { useAuthContext } from "../../helpers/hooks/useAuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFetch } from "../../helpers/hooks/useFetch";

// type PostPreviewableType = {
//     data: PostType
// }

type props = {
    data: PostPreviewableType,
    isLive: boolean
}

const PostPreviewable = ({ data, isLive }: props) => {
    const myFetch = useFetch();
    const queryClient = useQueryClient();
    const formattedDate = format(data.createdOn, "Lo LLL yyyy");
    const PFP_DEFAULT = "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";
    const DEFAULT_THUMBNAIL = "https://thumbs.dreamstime.com/b/rice-crop-symbol-rice-wheat-ears-design-element-agriculture-grain-colorful-vector-illustration-rice-crop-symbol-rice-wheat-129367791.jpg";
    const { user } = useAuthContext();



    const likeMutation = useMutation({
        mutationFn:(postId:string)=> myFetch(`/posts/${postId}/like`,{method:"PUT"}),
        onSuccess: ()=>{
            console.log("BRO")
            console.log("OIOIOI", ["post",Number(data.id)])
            queryClient.invalidateQueries({queryKey:["post",Number(data.id)]});
            queryClient.invalidateQueries({queryKey:["feed"]});
        },
        onError:(error)=>{
            console.log(error.message);
        }
    })


    const unlikeMutation = useMutation({
        mutationFn:(postId:string)=> myFetch(`/posts/${postId}/like`,{method:"DELETE"}),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:["post",Number(data.id)]});
            queryClient.invalidateQueries({queryKey:["feed"]});
        },

        onError:(error)=>{
            console.log(error.message);
        }
    })

    const handleLike = ()=>{
        if (data.id && user){
            likeMutation.mutate(data.id);
        }
    }

    const handleUnlike = ()=>{
        if (data.id && user){
            unlikeMutation.mutate(data.id)
        }
    }
    return (
        <>
            <section className="post-main">
                <p className="post-title">{data?.title}</p>

                <div className="post-tags">
                    <span className="like_count">
                        <Icon
                            icon="stash:thumb-up-light"
                            height="22"
                            width="22"
                            onClick={handleLike}
                        />
                        <Icon
                            icon="stash:thumb-down-light"
                            height="22"
                            width="22"
                            onClick={handleUnlike}
                        />                        
                        {data.like_count}
                    </span>
                    
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
                                <Icon width="20" icon="uit:calender" />
                                <span>{formattedDate}</span>
                            </p>

                        </div>

                    </div>

                </div>
                {data.thumbnail != "" &&
                    <img src={data.thumbnail} alt="" className="post-picture" />
                }
            </section>
            <section className="post-body">
                {data.body}
            </section>
        </>
    );
}

export default PostPreviewable;