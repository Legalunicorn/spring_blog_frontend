import "./home.scss"
import type { TagSummary } from "../../helpers/types";
import { useQuery } from "@tanstack/react-query";
import { useFetch } from "../../helpers/hooks/useFetch";
import { useNavigate } from "react-router";

const HomeTags = () => {
    const myFetch = useFetch();
    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery<TagSummary[]>({
        queryKey: ["all-tags"],
        queryFn: () => myFetch("/tags")
    })

    if (isLoading) return <p>Loading</p>
    if (isError) return <p>Error</p>

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