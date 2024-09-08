import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faCaretDown
} from '@fortawesome/free-solid-svg-icons';
import './styles.scss'

import {
    Link
} from "react-router-dom";

import { Menu, MenuItem } from "../Popper/Popper";

import Logo from '../../assets/images/logo.png';

const Header = () => {
    let navigate = useNavigate();
    window.addEventListener('scroll', function () {
        const header = document.getElementById('header');

        if (window.scrollY > 0) {
            header.classList.remove('transparent');
            header.classList.add('solid');
        } else {
            header.classList.remove('solid');
            header.classList.add('transparent');
        }
    });

    const [genre, setGenre] = useState(null);

    const handleMenuClick = async () => {
        console.log("Menu clicked");
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
        };

        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/genre/movie/list?language=en`,
                options
            );

            const data = await response.json();
            setGenre(data);
        } catch (error) {
            console.log(error);
        }
    };

    const [movieSearch, setMovieSearch] = useState([]);
    const handleSearch = () => {
        if (movieSearch.trim()) {
            navigate(`/movieSearch/query/${movieSearch}`);
            setMovieSearch('');
        }
    };

    return (
        <>
            <header id="header">
                <div id="logo-section">
                    <img src={Logo} alt="Netflix Logo" onClick={() => navigate("/")} />
                </div>
                <nav className="navbar">
                    <ul className="navbar-lists">
                        <li><Link className="navbar-item" to="/">HOME</Link></li>
                        <li>
                            <Menu
                                className="navbar-item"
                                label={
                                    <>
                                        MOVIES &nbsp;<FontAwesomeIcon icon={faCaretDown} />
                                    </>
                                }
                            >
                                <MenuItem label="Now Playing" to="/movielist/now_playing" />
                                <MenuItem label="Popular" to="/movielist/popular" />
                                <MenuItem label="Top Rated" to="/movielist/top_rated" />
                                <MenuItem label="Upcoming" to="/movielist/upcoming" />
                            </Menu>
                        </li>
                        <li><Link className="navbar-item" to="/tvshow">TV SHOWS</Link></li>
                        <li><Link className="navbar-item" to="/people">PEOPLE</Link></li>
                        <li><Menu
                            onMenuClick={handleMenuClick}
                            className="navbar-item"
                            label={
                                <>
                                    GENRE &nbsp;<FontAwesomeIcon icon={faCaretDown} />
                                </>
                            }
                        >
                            {genre?.genres.map((genre) => (
                                <MenuItem key={genre.id} label={genre.name} to={`/genre/${genre.id}-${genre.name}`} />
                            ))}
                        </Menu>
                        </li>
                    </ul>
                </nav>
                <form id="search-section" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                    <input required type="text" value={movieSearch} placeholder="Search for a movie" onChange={(e) => setMovieSearch(e.target.value)} />
                    <FontAwesomeIcon id="search-but" icon={faMagnifyingGlass} onClick={handleSearch} />
                </form>
            </header>


        </>
    )
}

export default Header