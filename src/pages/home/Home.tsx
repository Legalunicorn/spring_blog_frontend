import { useNavigate } from "react-router";
import { useFetch } from "../../helpers/hooks/useFetch";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PostSummary } from "../../helpers/types";
import PostCard from "../../components/postCard/PostCard";
import "./home.scss"


type feedType= "recent" | "top";


const Home = () => {

    const myFetch = useFetch();
    const navigate = useNavigate();
    const [sort,setSort] = useState<feedType>("recent");

    const {
        isLoading,
        isError,
        data,
        error
    } = useQuery<PostSummary[]>({
        queryKey: ["feed",sort],
        queryFn: ()=> myFetch(`/posts`)
    })

    //Side page for : tags
    return (
        <div className="home-page page">
            <div className="home-main">
                <section className="feed-options">
                    <button
                        onClick={()=>setSort("top")}
                        className={sort=="top"?"selected":""}
                    >Top</button>
                    <button
                        onClick={()=>setSort("recent")}
                        className={sort=="recent"?"selected":""}
                    >Recent</button>
                </section>
                {isLoading || data==undefined
                ?<p>loading</p>
                :data.map(post=>(
                    <PostCard post={post}/>
                ))
                }
            </div>
            <div className="home-side">
                Tags
            </div>
        </div>
    );
}
 
export default Home;