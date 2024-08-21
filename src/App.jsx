import { useState } from 'react';
import { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Movie from './pages/Movie/Movie';
import TV from './pages/TV/TV';
import People from './pages/People/People';


import Header from './layouts/Header/Header'

function App() {
  const [movieTrending, setMovieTrending] = useState([]);
  const [movieTopRates, setMovieTopRates] = useState([]);

  useEffect(() => {
    (async function () {
      const urls = [
        "https://api.themoviedb.org/3/trending/movie/day?language=vi",
        "https://api.themoviedb.org/3/movie/top_rated?language=vi",
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
        setMovieTopRates(response[1].results);

      } catch (error) {
        console.log(error);
      }

    })();
  }, []);

  return (
    <>
      <Header />
      <Routes>

        <Route path="/" element={<Home movieTrending={movieTrending} movieTopRates={movieTopRates} />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/people" element={<People />} />
        <Route path="/tvshow" element={<TV />} />

      </Routes>

    </>
  )
}

export default App
