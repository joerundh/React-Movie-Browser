import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.jsx'
import Home from './components/Home.jsx'
import MovieList from './components/MovieList.jsx'
import MovieDetails from './components/MovieDetails.jsx'
import Search from './components/Search.jsx'

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h3>500 Internal server error</h3>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/search",
        element: <Search />
      },
      {
        path: "/list",
        element: <MovieList />
      },
      {
        path: "/film",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <>
              <h3>Error</h3>
              <h4>No valid movie ID entered.</h4>
            </>
          },
          {
            path: ":id",
            element: <MovieDetails />
          }
        ]
      },
      {
        path: "*",
        element: <h3>404 Not found</h3>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
