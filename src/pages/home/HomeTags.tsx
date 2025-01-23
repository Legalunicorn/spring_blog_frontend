import "./home.scss"
import type { TagSummary } from "../../helpers/types";
import { useQuery } from "@tanstack/react-query";
import { useFetch } from "../../helpers/hooks/useFetch";
import { useNavigate } from "react-router";
// import StandardError from "../../components/layouts/Error/StandardError";
import Loader from "../../components/loader/Loader";

const HomeTags = () => {
    const myFetch = useFetch();
    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery<TagSummary[]>({
        queryKey: ["all-tags"],
        queryFn: () => myFetch("/tags")
    })
    if (isLoading) return <Loader loading={isLoading}/>
    if (isError || data == undefined) return <>No tags found</>
    return (
        <section className="home-tags">
            {data && data.map(tag => (
                <p key={tag.name}
                    onClick={()=>navigate(`/tags/${tag.name}`)}
                >
                    {tag.name}
                </p>
            ))}
        </section>
    );
}

export default HomeTags;