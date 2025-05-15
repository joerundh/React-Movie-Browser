import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

async function fetchFilms() {
    const res = await fetch("https://ghibliapi.vercel.app/films");
    if (!res.ok) {
        throw new Error("Unable to fetch movies");
    }
    return await res.json();
}

export default function MovieList() {
    const { data, isLoading, error } = useQuery({
        queryKey: [ "ghibliFilms", "list" ],
        queryFn: fetchFilms
    });

    const movieList = () => {
        if (isLoading) return (
            <p>Loading list...</p>
        )
        if (error) return (
            <>
                <h3>Error</h3>
                <h4>{error.message}</h4>
            </>
        )
        return (
            <>
                <ul>
                    {
                        data.map(film => (
                            <li key={film.id} style={{ listStyleType: "none", width: "fit-content" }}>
                                <h3><Link to={`/film/${film.id}`}>{film.title} ({film.release_date})</Link></h3>
                            </li>
                        ))
                    }
                </ul>
            </>
        )
    }

    return (
        <>
            <h2>Movie list</h2>
            <p>Click on the titles in the list to see information about each particular movie.</p>
            {
                movieList()
            }
        </>
    )
}