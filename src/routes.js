import Home from './containers/Home';
// import { fetchDataIfNeeded } from './containers/Home/action';
import NotFound from './containers/NotFound';

export default [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/UserInfo/:id',
    component: NotFound,
  },
  {
    path: '*',
    component: NotFound,
  },
];
