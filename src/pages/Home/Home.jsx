import PropTypes from "prop-types";

import Banner from "../../layouts/Banner/Banner";
import MovieList from "../../layouts/MovieList/MovieList";

import "./styles.scss"
import TVList from "../../layouts/MovieList/TVList";

const Home = ({ movieTrending, tvTrending }) => {
    return (
        <>
            <Banner movieTrending={movieTrending} />

            <div id="movie-section">
                <MovieList title="Trending Movie Lists" data={movieTrending} />
                <TVList title="TV Shows Lists" data={tvTrending} />
            </div >
        </>
    )
}

Home.propTypes = {
    movieTrending: PropTypes.array,
    tvTrending: PropTypes.array,
};

export default Home