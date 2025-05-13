export default function Home() {
    return (
        <>
            <h2>Movie list and search using React router DOM and useQuery<br />(plus useNavigate, twice)</h2>
            <p style={{ textAlign: "left" }}>
                In this project, React router DOM is used to render different pages, those pages being a list page, a search page, 
                and when a movie is chosen (clicked on), an information page about the movie in particular.
            </p>
            <p style={{ textAlign: "left" }}>
                To get a list of all movies available for browsing, useQuery is employed to call the Studio Ghibli API, which in its simplest use case returns an array of objects which contain details about a set of movies. In the list page, the title of every movie object in the array is put into a one-page list. In the search app, the full list is fetched again, only the movies are "filtered" according to whether or not the title contains a phrase or otherwise some combinations of symbols, really, entered by the user, upon which they then press a button with the text "Search" written on it. I.e., a search form and a list of search results.
            </p>
            <p style={{ textAlign: "left" }}>
                For ease, useNavigate has been used to clear the search form, by merely just navigating to the page "/search". Surely something more elegant, and possibly more "standard", albeit more involved, would preferably be done. But it works, and well enough so too. It has also been used for a "Go back" link on the movie details page, such that the user returns either to the movie list or the search results, depending on wherefrom they opened the movie details page.
            </p>
        </>
    )
}