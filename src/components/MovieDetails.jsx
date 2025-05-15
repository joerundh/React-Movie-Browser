import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useParams, useNavigate, Link } from "react-router"

async function fetchFilm(id) {
    const res = await fetch(`https://ghibliapi.vercel.app/films/${id}`);
    if (!res.ok) {
        throw new Error("No valid movie ID entered.")
    }
    return await res.json();
}

export default function MovieDetails() {
    const navigate = useNavigate();
    const { ...params } = useParams();
    
    const { data, isLoading, error } = useQuery({
        queryKey: [ `ghibliFilm`, params.id ],
        queryFn: () => fetchFilm(params.id)
    });

    if (isLoading) {
        return (
            <p>Loading movie details...</p>
        )
    }
    if (error) {
        return (
            <>
                <h3>Error</h3>
                <p>{error.message}</p>
            </>
        )
    }

    return (
        <>
            <p>
                <Link onClick={() => navigate(-1)}>Go back</Link>
            </p>
            <h2>{data.title}</h2>
            <p>
                <img src={data.image} height={400} />
            </p>
            <h4>Released in: {data.release_date}</h4>
            <h4>Description</h4>
            <p style={{ textAlign: "left" }}>
                {data.description}
            </p>
        </>
    )
}