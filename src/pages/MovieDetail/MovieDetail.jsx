import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
import ReviewList from '../../layouts/ReviewList/ReviewList';
import './styles.scss'
import Loading from '../../layouts/Loading/Loading';

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
    let navigate = useNavigate();
    const { idMovie } = useParams();
    const [movie, setMovie] = useState({});
    const [actors, setActors] = useState([]);
    const [crews, setCrews] = useState([]);
    const [keywords, setKeywords] = useState([])
    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState(true);

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
            setIsLoading(true)
            try {
                let data = {};
                const urls = [
                    `https://api.themoviedb.org/3/movie/${idMovie}?language=en-US`,
                    `https://api.themoviedb.org/3/movie/${idMovie}/credits?language=en-US`,
                    `https://api.themoviedb.org/3/movie/${idMovie}/keywords`,
                    `https://api.themoviedb.org/3/movie/${idMovie}/reviews?language=en-US&page=1`
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
                    setCrews(response[1].crew);
                    setKeywords(response[2].keywords)
                    setReviews(response[3].results)
                } catch (error) {
                    console.log(error);
                }
                setMovie(data);
            } catch (error) {
                console.error('Error fetching actor details:', error);
            } finally {
                setIsLoading(false)
            }
        };

        fetchMovieDetails();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [idMovie]);
    if (isLoading) {
        return <Loading />
    }


    const directorOrStoryCrew = crews.find(crew => ['Director', 'Story'].includes(crew.job));
    return (
        <>
            <div id="movieDetail-section"
                style={{ backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.3)), url(${import.meta.env.VITE_BACKGROUND_URL}${movie.backdrop_path})` }}
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
                                <div className="circle-border" style={{ '--score': movie.vote_average || 0 }}>
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
                            <p className='movieDetail-info_item_answer'>{Math.floor(movie.runtime / 60)}h {(movie.runtime % 60)}m</p>
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
                    <div className="movieDetail-info_director">
                        <p className='movieDetail-info_item_header'>Director</p>
                        <span
                            className="movieDetail-info_director_item"
                            onClick={() => {
                                if (directorOrStoryCrew) {
                                    navigate(`/people/${directorOrStoryCrew.id}`);
                                }
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            {directorOrStoryCrew?.original_name || 'N/A'}
                        </span>
                    </div>


                </div>
            </div >
            <div className="movieDetail-Info">
                <div className="Info-left">
                    <div id="movieDetail-actor">
                        <PeopleList title="Cast" data={actors} />
                    </div>
                    <div id="movieDetail-review">
                        <ReviewList reviews={reviews} />
                    </div>
                </div>
                <div className="Info-right">
                    <div id="movieDetail-Bio">
                        <div className="bio_item" id="bio_origin">
                            <div className="bio_item-heading">
                                <p>Original Title</p>
                            </div>
                            <div className="bio_item-content">
                                <p>{movie.original_title}</p>
                            </div>
                        </div>
                        <div className="bio_item" id="bio_status">
                            <div className="bio_item-heading">
                                <p>Status</p>
                            </div>
                            <div className="bio_item-content">
                                <p>{movie.status}</p>
                            </div>
                        </div>
                        <div className="bio_item" id="bio_language">
                            <div className="bio_item-heading">
                                <p>Language</p>
                            </div>
                            <div className="bio_item-content">
                                <p>{movie.original_language}</p>
                            </div>
                        </div>
                        <div className="bio_item" id="bio_budget">
                            <div className="bio_item-heading">
                                <p>Budget</p>
                            </div>
                            <div className="bio_item-content">
                                <p>$ {parseInt(movie.budget).toLocaleString("en-US")}</p>
                            </div>
                        </div>
                        <div className="bio_item" id="bio_revenue">
                            <div className="bio_item-heading">
                                <p>Revenue</p>
                            </div>
                            <div className="bio_item-content">
                                <p>$ {parseInt(movie.revenue).toLocaleString("en-US")}</p>
                            </div>
                        </div>
                        <div className="bio_item" id="bio_keyword">
                            <div className="bio_item-heading">
                                <p>Keywords</p>
                            </div>
                            <ul className="bio_item-list">
                                {keywords.map((keyword) => (
                                    <li className="keywordItem" key={keyword.id} title={keyword.name} onClick={() => navigate(`/keyword/${keyword.id}-${keyword.name}`)}>
                                        {keyword.name}
                                    </li>
                                ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
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