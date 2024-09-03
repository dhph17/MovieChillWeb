import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleRight
} from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import './styles.scss'

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 10,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1200 },
        items: 6,
    },
    tablet: {
        breakpoint: { max: 1200, min: 600 },
        items: 3,
    },
    mobile: {
        breakpoint: { max: 600, min: 0 },
        items: 2,
    },
};

const MovieList = ({ title, data }) => {
    let navigate = useNavigate();
    return (
        <div id="movie">
            <div className="movie-title">
                {title}
                <FontAwesomeIcon className="movie-title_icon" icon={faAngleRight} />
            </div>
            <Carousel className="movie_lists"
                responsive={responsive}
                draggable={false} autoPlay={true}
                autoPlaySpeed={3000}
            >
                {data?.map((movie) => (
                    <div
                        key={movie.id}
                        className="movie_item"
                        style={{
                            backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${movie.poster_path
                                })`,
                        }}
                        onClick={() => navigate(`/movie/${movie.id}`)}
                    >
                        <div className="overlay-item">
                        </div>
                        <h3 className="item-name">
                            {movie.name || movie.title || movie.original_title}
                        </h3>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

MovieList.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array,
};

export default MovieList