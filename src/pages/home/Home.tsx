// import { useNavigate } from "react-router";
import { useFetch } from "../../helpers/hooks/useFetch";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PostSummary } from "../../helpers/types";
import PostCard from "../../components/postCard/PostCard";
import "./home.scss"
import HomeTags from "./HomeTags";
import Loader from "../../components/loader/Loader";


type feedType = "recent" | "top";


const Home = () => {

    const myFetch = useFetch();
    // const navigate = useNavigate();
    const [sort, setSort] = useState<feedType>("recent");

    const postQuery = useQuery<PostSummary[]>({
        queryKey: ["posts", "feed", sort],
        queryFn: () => myFetch(`/posts?sort=${sort}`)
    })



    console.log("HOME: ", postQuery.data)

    //Side page for : tags
    return (
        <div className="home-page page">
            <div className="home-main">
                <section className="feed-options">
                    <button
                        onClick={() => setSort("top")}
                        className={sort == "top" ? "selected" : ""}
                    >
                        Top
                    </button>
                    <button
                        onClick={() => setSort("recent")}
                        className={sort == "recent" ? "selected" : ""}
                    >
                        Recent
                    </button>
                </section>

                {postQuery.isLoading || postQuery.data == undefined 
                    ? <Loader loading={true}/>
                    : postQuery.data.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))
                }
            </div>
            <div className="home-side">
                <p>Tags</p>
                <HomeTags />
            </div>
        </div>
    );
}

export default Home;