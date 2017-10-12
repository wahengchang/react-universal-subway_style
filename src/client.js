import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import _ from 'lodash';
import Helmet from 'react-helmet';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './routes';
import helmetconfig from './appConfig';
import configureStore from './redux/store';
import './styles/style.css';

const element = document.getElementById('app-container');

const initState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const store = configureStore(initState);

render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Helmet {...helmetconfig.header} />
        <Switch>{routes.map(route => <Route key={_.uniqueId()} exact={route.exact || false} path={route.path} render={props => (<route.component {...props} routes={route.routes || null} />)} />)}</Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  element,
);
