import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Pagination from "../../layouts/Pagination/Pagination";
import "./styles.scss";
const People = () => {
    let navigate = useNavigate();

    const [actors, setActors] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchActors = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/person/popular?language=vi&page=${page}`,
                    {
                        method: "GET",
                        headers: {
                            accept: "application/json",
                            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                        },
                    }
                );
                const data = await response.json();
                setActors(data.results);
                setTotalPages(Math.min(data.total_pages, 100));
            } catch (error) {
                console.error('Error fetching actors:', error);
            }
        };

        fetchActors();
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }, [page]);
    // console.log(actors);

    const handlePageClick = async (data) => {
        console.log(data.selected);
        setPage(data.selected + 1)
    };

    return (
        <>
            <div id="people-header">
                <p>People</p>
            </div>

            <div id="people-section">
                <div className="people-list">
                    {actors?.map((actor) => (
                        <div key={actor.id} className="people-item"
                            style={{
                                backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${actor.profile_path})`
                            }}
                            onClick={() => navigate(`/people/${actor.id}`)}>
                            <div className="overlay-item">
                            </div>
                            <h3 className="item-name">
                                {actor.name || actor.original_name}
                            </h3>
                        </div>
                    ))}

                </div>

            </div>

            <Pagination handlePageClick={handlePageClick} totalPages={totalPages} page={page} />
        </>
    )
}

export default People