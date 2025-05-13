import { useQuery } from "@tanstack/react-query";
import { useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router";

async function searchFilms() {
    const res = await fetch(`https://ghibliapi.vercel.app/films`);
    if (!res.ok) {
        throw new Error("An error occurred somewhere.")
    }
    return await res.json();
}

export default function Search() {
    const navigate = useNavigate();

    const [ searchParams ] = useSearchParams()
    const [ searchString, setSearchString ] = useState(searchParams.get("q") || "");

    const { data, isLoading, error } = useQuery({
        queryKey: [ "ghibliSearch" ],
        queryFn: searchFilms,
        enabled: !!searchParams.get("q")
    })

    const searchResults = () => {
        if (!searchParams.get("q")) return (
            <></>
        )
        if (isLoading) return (
            <h3>Searching...</h3>
        )
        if (error) return (
            <>
                <h3>Error</h3>
                <h4>{error.message}</h4>
            </>
        )
        const results = data.filter(film => film.title.toLowerCase().includes(searchParams.get("q").toLowerCase()));
        return <SearchResults query={searchParams.get("q")} results={results} />
    }

    const resetForm = e => {
        e.preventDefault();
        navigate("/search");
        setSearchString("");
    }

    return (
        <>
            <h2>Search for a movie</h2>
            <form method="GET">
                <input type="text" name="q" value={searchString} onChange={e => setSearchString(e.target.value)} />
                <button type="submit">Search</button>
                <button onClick={e => resetForm(e)}>Reset</button>
            </form>
            {
                searchResults()
            }
        </>
    )
}

function SearchResults({ query, results }) {
    if (!results) return (<></>)
    if (!results.length) return (
        <h3>No results found for "{query}".</h3>
    )
    return (
        <>
            <h3>Results for "{query}"</h3>
            <ul>
                {
                    results.map(film => (
                        <li key={film.id} style={{ listStyleType: "none", width: "fit-content" }}>
                            <Link to={`/film/${film.id}`}><h4>{film.title}</h4></Link>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}