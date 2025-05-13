import { useState } from 'react'
import './App.css'
import { Link, Outlet } from 'react-router'

function App() {
  return (
    <>
      <header>
        <nav style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 10 }}>
          <Link to="/">Home</Link>
          <Link to="/list">List</Link>
          <Link to="/search">Search</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
