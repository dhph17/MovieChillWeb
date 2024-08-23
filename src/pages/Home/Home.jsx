import PropTypes from "prop-types";

import Banner from "../../layouts/Banner/Banner";
import MovieList from "../../layouts/MovieList/MovieList";

import "./styles.scss"

const Home = ({ movieTrending, movieTopRates }) => {
    return (
        <>
            <Banner movieTrending={movieTrending} />

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