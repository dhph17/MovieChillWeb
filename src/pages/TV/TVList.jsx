import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import './styles.scss'
import Pagination from "../../layouts/Pagination/Pagination";
import TVGrid from "../../layouts/MovieGrid/TVGrid";

const TVList = () => {
    let { tvlist } = useParams()
    let [tvs, setTVs] = useState([])
    let list = {
        airing_today: "Airing Today",
        popular: "Popular",
        top_rated: "Top Rated",
        on_the_air: "On The Air"
    }

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
                    `https://api.themoviedb.org/3/tv/${tvlist}?language=en-US&page=${page}`,
                    options
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch movies");
                }

                const data = await response.json();
                setTVs(data.results);
                setTotalPages(Math.min(data.total_pages, 100))
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
        fetchMovies();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [tvlist, page]);

    const handlePageClick = async (data) => {
        console.log(data.selected);
        setPage(data.selected + 1)
    };

    return (
        <>
            <div id="tvList-header">
                <p>{list[tvlist]}</p>
            </div>

            <TVGrid moviesList={tvs} />

            <Pagination handlePageClick={handlePageClick} totalPages={totalPages} page={page} />
        </>
    )
}

export default TVList