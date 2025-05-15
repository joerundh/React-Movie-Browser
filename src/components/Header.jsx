import { Link } from "react-router"

export default function Header() {
    return (
        <header>
            <nav style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 10 }}>
                <Link to="/">Home</Link>
                <Link to="/list">List</Link>
                <Link to="/search">Search</Link>
            </nav>
        </header>
    )
}