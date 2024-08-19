import PropTypes from "prop-types";
import Banner from "../../assets/images/spiderman-poster.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
    faClock,
    faPlay
} from '@fortawesome/free-solid-svg-icons';
import MovieList from "../../layouts/MovieList/MovieList";

import "./styles.scss"

const Home = ({ movieTrending, movieTopRates }) => {

    console.log(movieTrending);
    console.log(movieTopRates);


    return (
        <>
            <div id="banner-section">
                <img src={Banner} alt="Banner" className="banner-image" />
                <div className="overlay">
                </div>
                <div className="banner-content">
                    <div className="side-content">
                        <h1>Spider-Man: No Way Home</h1>
                        <div className="side-content_idmb">
                            <div className="side-content_idmb_item" id="side-content_rated">
                                <FontAwesomeIcon className="side-icon" icon={faStar} />
                                8.9
                            </div>
                            <div className="side-content_idmb_item" id="side-content_time">
                                <FontAwesomeIcon className="side-icon" icon={faClock} />
                                <span>148 mins</span>
                            </div>
                            <div className="side-content_idmb_item" id="side-content_hd">
                                <span>HD</span>
                            </div>
                            <div className="side-content_idmb_item" id="side-content_R">
                                <span>16+</span>
                            </div>

                        </div>
                        <div className="side-content_detail">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, possimus eius. Deserunt non odit, cum vero reprehenderit laudantium odio vitae autem quam, incidunt molestias ratione mollitia accusantium, facere ab suscipit.
                            </p>
                        </div>

                        <button className="side-content_button">
                            <FontAwesomeIcon className="button-icon" icon={faPlay} />
                            <p>WATCH NOW</p>
                        </button>
                    </div>


                </div>
            </div>

            <div id="movie-section">
                <MovieList title="Trending Movie Lists" data={movieTrending} />
                <MovieList title="Top Rated Movie Lists" data={movieTopRates} />
            </div >
        </>
    )
}

Home.propTypes = {
    movieTrending: PropTypes.array,
    movieTopRates: PropTypes.array,
};

export default Home