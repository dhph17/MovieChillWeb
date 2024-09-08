import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import QR from '../../assets/images/qrcode.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTiktok,
    faInstagram,
    faFacebook,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import './styles.scss'
const Footer = () => {
    let navigate = useNavigate();
    return (
        <footer>
            <div id="logo-section">
                <img src={Logo} alt="Netflix Logo" onClick={() => navigate("/")} />
            </div>
            <div className="footer-content">
                <div className='content-section' id="social-section">
                    <p>Follow MovieChill on social</p>
                    <ul id="social-list">
                        <li className='social-item'><a href=""><FontAwesomeIcon icon={faTiktok} /></a></li>
                        <li className='social-item'><a href="https://www.facebook.com/profile.php?id=100033073282012&locale=vi_VN" target='_blank'><FontAwesomeIcon icon={faFacebook} /></a></li>
                        <li className='social-item'><a href="https://www.instagram.com/phi_hung_1903/"><FontAwesomeIcon icon={faInstagram} /></a></li>
                        <li className='social-item'><a href=""><FontAwesomeIcon icon={faYoutube} /></a></li>
                    </ul>
                </div>
                <div className='content-section' id="mobile-app-section">
                    <p>Get more information</p>
                    <img src={QR} alt="QR code TMDB" />
                </div>
            </div>
            <div className="footer-about">
                <ul className='about-list_1'>
                    <li className='about-item' title='Help'>Help</li>
                    <li className='about-item' title='Site Index'>Site Index</li>
                    <li className='about-item' title='TMDBPro'>TMDBPro</li>
                    <li className='about-item' title='Box Office Mojo'>Box Office Mojo</li>
                    <li className='about-item' title='License TMDB Data'>License TMDB Data</li>
                </ul>
                <ul className='about-list_2'>
                    <li className='about-item' title='Press Room'>Press Room</li>
                    <li className='about-item' title='Advertising'>Advertising</li>
                    <li className='about-item' title='Jobs'>Jobs</li>
                    <li className='about-item' title='Conditions of Use'>Conditions of Use</li>
                    <li className='about-item' title='Privacy Policy'>Privacy Policy</li>
                    <li className='about-item' title='Your Ads Privacy Choices'>Your Ads Privacy Choices</li>
                </ul>
            </div>
            <div id="footer-aboutMe">
                <p>17/7/2024 MyProject: The MovieChill dhph17</p>
            </div>
        </footer>
    )
}

export default Footer