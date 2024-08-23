import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Modal from 'react-modal';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClock,
    faCalendarDays,
    faPlay
} from '@fortawesome/free-solid-svg-icons';

import {
    faCircle
} from '@fortawesome/free-regular-svg-icons';

import PeopleList from '../../layouts/PeopleList/PeopleList';
import './styles.scss'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const opts = {
    height: '390',
    width: '640',
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
    },
};

const MovieDetail = () => {
    const { idMovie } = useParams();
    const [movie, setMovie] = useState({});
    const [actors, setActors] = useState([]);

    const [modalIsOpen, setIsOpen] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState("");
    const handleVideoTrailer = async (idMovie) => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
        };

        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${idMovie}/videos?language=en-US`,
                options
            );

            const data = await response.json();
            setTrailerUrl(data.results[data.results.length - 1]?.key);
            setIsOpen(true);
        } catch (error) {
            console.log(error);
        }
    };

    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                let data = {};
                const urls = [
                    `https://api.themoviedb.org/3/movie/${idMovie}?language=en-US`,
                    `https://api.themoviedb.org/3/movie/${idMovie}/credits?language=en-US`,
                    `https://api.themoviedb.org/3/movie/${idMovie}/videos?language=en-US`
                ];

                const options = {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                    },
                };
                const fetchMovies = async (url) => {
                    return await fetch(url, options).then((response) => response.json());
                };
                try {
                    const response = await Promise.all(urls.map(fetchMovies));
                    data = response[0];
                    setActors(response[1].cast);

                } catch (error) {
                    console.log(error);
                }
                setMovie(data);
            } catch (error) {
                console.error('Error fetching actor details:', error);
            }
        };

        fetchMovieDetails();
    }, [idMovie]);
    console.log(actors);

    return (
        <>
            <div id="movieDetail-section"
                style={{ backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url(${import.meta.env.VITE_IMG_URL}${movie.backdrop_path})` }}
            >
                <div
                    className="movieDetail-image"
                    style={{ backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${movie.poster_path})` }}
                    onClick={() => handleVideoTrailer(movie.id)}
                >
                    <div className="overlay">

                    </div>
                    <div className="movieDetail-image_circle">
                        <FontAwesomeIcon icon={faCircle} />
                    </div>
                    <div className="movieDetail-image_play">
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                </div>
                <div className="movieDetail-info">
                    <p className='movieDetail-info_name'>{movie.original_title || movie.title}</p>
                    <p className='movieDetail-info_tagline'>{movie.tagline}</p>
                    <div className="movieDetail-info_idmb">
                        <div className="movieDetail-info_item">
                            <div className='movieDetail-info_item_circle'>
                                <div className="circle-border">
                                    <p className='movieDetail-info_item_score'>
                                        {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="movieDetail-info_item">
                            <p className='movieDetail-info_item_header'>
                                <FontAwesomeIcon icon={faCalendarDays} />
                            </p>
                            <p className='movieDetail-info_item_answer'>{movie.release_date}</p>
                        </div>
                        <div className="movieDetail-info_item">
                            <p className='movieDetail-info_item_header'>
                                <FontAwesomeIcon icon={faClock} />
                            </p>
                            <p className='movieDetail-info_item_answer'>{movie.runtime} mins</p>
                        </div>
                    </div>
                    <div className="movieDetail-info_genre">
                        <p className='movieDetail-info_item_header'>Genre</p>
                        <span className='movieDetail-info_genre_item'>
                            {movie.genres?.map(genre => genre.name).join(', ')}
                        </span>
                    </div>

                    <div className="movieDetail-info_detail" onClick={toggleExpand}>
                        {movie.overview && <p className='movieDetail-info_detail_header'>Overview</p>}
                        <p className={isExpanded ? 'movieDetail-info_detail_bio expanded' : 'movieDetail-info_detail_bio'}>{movie.overview}</p>
                    </div>


                </div>
            </div >
            <div id="movieDetail-actor">
                <PeopleList title="Member" data={actors} />
            </div>



            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            </Modal>
        </>
    )
}

export default MovieDetail