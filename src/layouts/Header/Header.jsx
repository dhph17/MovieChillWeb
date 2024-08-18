import Logo from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';

import './styles.scss'
const Header = () => {
    return (
        <>
            <header>
                <div id="logo-section">
                    <img src={Logo} alt="Netflix Logo" />
                </div>
                <nav className="navbar">
                    <ul className="navbar-lists">
                        <li className="navbar-item">HOME</li>
                        <li className="navbar-item">MOVIES</li>
                        <li className="navbar-item">TV SHOWS</li>
                        <li className="navbar-item">PEOPLE</li>
                        <li className="navbar-item">GENRE</li>
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