import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import './styles.scss'

const MovieGrid = ({ moviesList }) => {
    let navigate = useNavigate();
    return (
        <div id="movieList-section">
            <div className="movieList-list">
                {moviesList?.map((movie) => (
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
    )
}

MovieGrid.propTypes = {
    moviesList: PropTypes.array
}

export default MovieGrid