import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import ReactPaginate from 'react-paginate';

import './styles.scss'

const MovieSearch = () => {
    let navigate = useNavigate();
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

            <div id="movieList-section">
                <div className="movieList-list">
                    {movies?.map((movie) => (
                        <div key={movie.id} className="movieList-item"
                            style={{
                                backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${movie.poster_path})`
                            }}
                            onClick={() => navigate(`/movie/${movie.id}`)}
                        >
                            <div className="overlay-item">
                            </div>
                            <h3 className="item-name">
                                {movie.title || movie.original_title}
                            </h3>
                        </div>
                    ))}

                </div>

            </div>

            <ReactPaginate className='pagination-section'
                breakLabel="..."
                nextLabel={"»"}
                onPageChange={handlePageClick}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                pageCount={totalPages}
                previousLabel={"«"}
                renderOnZeroPageCount={null}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                previousClassName={page === 1 ? 'page-item disabled' : 'page-item'}
                previousLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
            />
        </>
    )
}

export default MovieSearch