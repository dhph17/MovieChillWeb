import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import './styles.scss'

const TVGrid = ({ moviesList }) => {
    let navigate = useNavigate();
    return (
        <div id="movieList-section">
            <div className="movieList-list">
                {moviesList?.map((movie) => (
                    <div key={movie.id} className="movieList-item"
                        style={{
                            backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${movie.poster_path})`
                        }}
                        onClick={() => navigate(`/tvshow/${movie.id}`)}
                    >
                        <div className="overlay-item">
                        </div>
                        <h3 className="item-name">
                            {movie.name || movie.original_name}
                        </h3>
                    </div>
                ))}

            </div>

        </div>
    )
}

TVGrid.propTypes = {
    moviesList: PropTypes.array
}

export default TVGrid