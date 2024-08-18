// routes config
import config from '../config';

// Layouts
import Header from '../layouts/Header';

// Pages
import Home from '../pages/Home';
import Movie from '../pages/Movie';

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: Header },
    { path: config.routes.movie, component: Movie },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
