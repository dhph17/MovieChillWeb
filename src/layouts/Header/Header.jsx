import Logo from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
import './styles.scss'

import {
    Link
} from "react-router-dom";

const Header = () => {

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

    return (
        <>
            <header id="header">
                <div id="logo-section">
                    <img src={Logo} alt="Netflix Logo" />
                </div>
                <nav className="navbar">
                    <ul className="navbar-lists">
                        <li><Link className="navbar-item" to="/">HOME</Link></li>
                        <li><Link className="navbar-item" to="/movie">MOVIES</Link></li>
                        <li><Link className="navbar-item" to="/tvshow">TV SHOWS</Link></li>
                        <li><Link className="navbar-item" to="/people">PEOPLE</Link></li>
                        <li><Link className="navbar-item" to="/">GENRE</Link></li>
                    </ul>
                </nav>
                <div id="search-section">
                    <input type="text" placeholder="Search for a movie" />
                    <FontAwesomeIcon id="search-but" icon={faMagnifyingGlass} />
                </div>
            </header>


        </>
    )
}

export default Header