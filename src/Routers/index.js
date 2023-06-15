
// Pages
import Home from '../Pages/Home';
import Theme from '../Pages/Theme';
import ThemeCharts from '../Pages/ThemeCharts';
import Uploads from '../Pages/Uploads';
import Singer from '../Pages/Singer';
import SingerCharts from '../Pages/SingerCharts';
import LibraryPage from '../Pages/LibraryPage';

// Public routes
const publicRoutes = [
    { path: '/', component: Home, },
    { path: '/uploads', component: Uploads, layout: null, },
    { path: '/theme', component: Theme, },
    { path: '/theme/chart', component: ThemeCharts, slug: true },
    { path: '/singer', component: Singer, },
    { path: '/singer/chart', component: SingerCharts, slug: true },
    { path: '/library', component: LibraryPage, },
];

// Private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
