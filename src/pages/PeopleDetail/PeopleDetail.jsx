import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTiktok,
    faInstagram,
    faTwitter,
    faFacebook,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons';

import MovieList from '../../layouts/MovieList/MovieList';
import './styles.scss';

const PeopleDetail = () => {
    const { id } = useParams();
    const [actor, setActor] = useState(null);
    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const media = {
        'tiktok_id': [faTiktok, 'Tiktok'],
        'instagram_id': [faInstagram, 'Instagram'],
        'twitter_id': [faTwitter, 'Twitter'],
        'facebook_id': [faFacebook, 'Facebook'],
        'youtube_id': [faYoutube, 'Youtube'],
    };

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        const fetchActorDetails = async () => {
            try {
                let data = {}
                const urls = [
                    `https://api.themoviedb.org/3/person/${id}?language=en-US`,
                    `https://api.themoviedb.org/3/person/${id}/external_ids`,
                    `https://api.themoviedb.org/3/person/${id}/movie_credits?language=vi`,
                    `https://api.themoviedb.org/3/person/${id}/tv_credits?language=vi`
                    // Add more URLs here...
                ];

                const options = {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                    },
                };
                const fetchMovies = async (url) => {
                    return await fetch(url, options).then((response) => response.json());
                };
                try {
                    const response = await Promise.all(urls.map(fetchMovies));
                    const data1 = response[0];
                    const data2 = response[1];
                    data = { ...data1, ...data2 };

                    setMovies(response[2].cast);
                    setTvShows(response[3].cast);
                } catch (error) {
                    console.log(error);
                }
                setActor(data);
            } catch (error) {
                console.error('Error fetching actor details:', error);
            }
        };

        fetchActorDetails();
    }, [id]);
    console.log(actor);

    if (!actor) return <p>Loading...</p>;

    return (
        <>
            <div id="profile-section">
                <div className="profile-image">
                    <img
                        src={`${import.meta.env.VITE_IMG_URL}${actor.profile_path}`}
                        alt={actor.name || actor.original_name}
                    />
                </div>
                <div className="profile-info">
                    <p className='profile-info_name'>{actor.name || actor.original_name}</p>
                    <div className="profile-info_idmb">
                        <div className="profile-info_item">
                            <p className='profile-info_item_header'>Birthday:</p>
                            <p className='profile-info_item_answer'>{actor.birthday}</p>
                        </div>
                        <div className="profile-info_item">
                            <p className='profile-info_item_header'>Place of Birth:</p>
                            <p className='profile-info_item_answer'>{actor.place_of_birth}</p>
                        </div>
                    </div>
                    <div className="profile-info_media">
                        <p className='profile-info_media_header'>Media:</p>
                        <div className="profile-info_media_list">
                            {
                                Object.entries(media).map(([fruit, value]) => (
                                    actor[fruit] && (
                                        <div key={fruit} className='profile-info_media_item'>
                                            <a href={`https://${value[1]}.com/${actor[fruit]}`} target="_blank" rel="noreferrer">
                                                <FontAwesomeIcon icon={value[0]} />
                                                <p>{actor[fruit]}</p>
                                            </a>

                                        </div>
                                    )

                                ))
                            }
                        </div>

                    </div>
                    <div className="profile-info_detail" onClick={toggleExpand}>
                        {actor.biography && <p className='profile-info_detail_header'>Biography</p>}
                        <p className={isExpanded ? 'profile-info_detail_bio expanded' : 'profile-info_detail_bio'}>{actor.biography}</p>
                    </div>


                </div>
            </div>

            <div id="profile-film">
                <MovieList title="Movies" data={movies} />
                <MovieList title="TV Shows" data={tvShows} />
            </div>
        </>
    );
}

export default PeopleDetail