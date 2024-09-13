import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import Pagination from "../../layouts/Pagination/Pagination";
import MovieGrid from "../../layouts/MovieGrid/MovieGrid";
import './styles.scss'

const MovieSearch = () => {
    let { value } = useParams()
    let [movies, setMovies] = useState([])

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchMovies = async () => {
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                },
            };

            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=${page}`,
                    options
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch movies");
                }

                const data = await response.json();
                setMovies(data.results);
                setTotalPages(Math.min(data.total_pages, 100))
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
        fetchMovies();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [value, page]);

    const handlePageClick = async (data) => {
        console.log(data.selected);
        setPage(data.selected + 1)
    };

    return (
        <>
            <div id="movieList-header">
                <p>Search &quot;{value}&quot;</p>
            </div>

            <MovieGrid moviesList={movies} />

            <Pagination handlePageClick={handlePageClick} totalPages={totalPages} page={page} />
        </>
    )
}

export default MovieSearch