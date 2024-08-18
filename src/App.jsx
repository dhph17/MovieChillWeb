import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Movie from './pages/Movie/Movie';
import TV from './pages/TV/TV';
import People from './pages/People/People';


import Header from './layouts/Header/Header'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/people" element={<People />} />
        <Route path="/tvshow" element={<TV />} />

      </Routes>

    </>
  )
}

export default App
