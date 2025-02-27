import { useParams } from "react-router";
import "./userProfile.scss"
import { useFetch } from "../../helpers/hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import { PostSummary } from "../../helpers/types";
import type { AuthorSummary } from "../../helpers/types";
import ProfileAndPosts from "./ProfileAndPosts";
import Loader from "../../components/loader/Loader";
import StandardError from "../../components/layouts/Error/StandardError";

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

    if (isLoading) return <Loader loading={isLoading}/>
    if (isError || data == undefined) return <StandardError/>

    return (
        <ProfileAndPosts
            user={data.user}
            posts={data.posts}
        />
    );
}
 
export default UserProfile;