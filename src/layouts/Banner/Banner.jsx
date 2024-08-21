import { useState } from "react";

import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
    faPlay
} from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

import "./styles.scss"

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 1,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1200 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1200, min: 600 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 600, min: 0 },
        items: 1,
    },
};

const Banner = ({ movieTrending }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <Carousel id="banner-section" responsive={responsive} draggable={false} autoPlay={true} autoPlaySpeed={3000}>
            {movieTrending?.map((movie) => (
                <div key={movie.id} id="banner-item">
                    <img src={`${import.meta.env.VITE_IMG_URL}${movie.backdrop_path}}`} alt="Banner" className="banner-image" />
                    <div className="overlay">
                    </div>
                    <div className="banner-content">
                        <div className="side-content">
                            <h1>{movie.title}</h1>
                            <div className="side-content_idmb">
                                <div className="side-content_idmb_item" id="side-content_rated">
                                    <FontAwesomeIcon className="side-icon" icon={faStar} />
                                    {movie.vote_average.toFixed(1)}
                                </div>
                                <div className="side-content_idmb_item" id="side-content_hd">
                                    <span>HD</span>
                                </div>
                            </div>
                            <div className="side-content_detail" onClick={toggleExpand}>
                                <p className={isExpanded ? 'expanded' : ''}>
                                    {movie.overview}
                                </p>
                            </div>

                            <button className="side-content_button">
                                <FontAwesomeIcon className="button-icon" icon={faPlay} />
                                <p>WATCH NOW</p>
                            </button>
                        </div>
                    </div>
                </div>

            ))}

        </Carousel>
    )
}

Banner.propTypes = {
    movieTrending: PropTypes.array,
};

export default Banner