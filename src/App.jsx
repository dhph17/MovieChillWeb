import { useState } from 'react';
import { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import People from './pages/People/People';
import ActorDetail from './pages/PeopleDetail/PeopleDetail';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import MovieList from './pages/MovieList/MovieList';

import Header from './layouts/Header/Header'
import MovieSearch from './pages/MovieList/MovieSearch';
import Footer from './layouts/Footer/Footer';
import MovieKeyword from './pages/MovieList/MovieKeyword';
import MovieGenre from './pages/MovieList/MovieGenre';
import TVList from './pages/TV/TVList';
import TVDetail from './pages/MovieDetail/TVDetail';

function App() {
  const [movieTrending, setMovieTrending] = useState([]);
  const [tvTrending, setTvTrending] = useState([]);

  useEffect(() => {
    (async function () {
      const urls = [
        "https://api.themoviedb.org/3/trending/movie/day?language=vi",
        "https://api.themoviedb.org/3/trending/tv/day?language=vi",
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

        setMovieTrending(response[0].results);
        setTvTrending(response[1].results);

      } catch (error) {
        console.log(error);
      }

    })();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home movieTrending={movieTrending} tvTrending={tvTrending} />} />
        <Route path="/people" element={<People />} />
        <Route path="/tvshowlist/:tvlist" element={<TVList />} />
        <Route path="/movielist/:movielist" element={<MovieList />} />
        <Route path="/people/:idPeople" element={<ActorDetail />} />
        <Route path="/tvshow/:idTVshow" element={<TVDetail />} />
        <Route path="/movie/:idMovie" element={<MovieDetail />} />
        <Route path="/movielist/:movielist" element={<MovieList />} />
        <Route path="/movieSearch/query/:value" element={<MovieSearch />} />
        <Route path="/keyword/:IdAndName" element={<MovieKeyword />} />
        <Route path="/genre/:genreIdAndGenreName" element={<MovieGenre />} />

      </Routes>
      <Footer />
    </>
  )
}

export default App
