import { useParams } from "react-router";
import "./userProfile.scss"
import { useFetch } from "../../helpers/hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import { PostSummary } from "../../helpers/types";
import type { AuthorSummary, User } from "../../helpers/types";
import ProfileAndPosts from "./ProfileAndPosts";
import Loader from "../../components/loader/Loader";
import StandardError from "../../components/layouts/Error/StandardError";
import { useAuthContext } from "../../helpers/hooks/useAuthContext";

type UserProfile = {
    user: AuthorSummary,
    posts: PostSummary[]
}

const UserDrafts = () => {

    const myFetch = useFetch();
    const {user} = useAuthContext() as {user: User};


    const {
        data,
        isLoading,
        isError
    } = useQuery<UserProfile>({
        queryKey:["userProfile",user.username],
        queryFn: ()=>myFetch(`/users/${user.username}/drafts`)
    })

    if (isLoading) return <Loader loading={isLoading}/>
    if (isError || data == undefined) return <StandardError/>

    return (
        <ProfileAndPosts
            user={data.user}
            posts={data.posts}
            label="Drafts"
        />
    );
}
 
export default UserDrafts;