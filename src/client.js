import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'grommet/scss/vanilla/index.scss';
// import _ from 'lodash';
import routes from './routes';
import configureStore from './store';
import './styles/style.css';

const element = document.getElementById('app-container');

const initState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const store = configureStore(initState);

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        {
          routes.map((route, index) => <Route key={`route${index}`} {...route} />)
        }
      </Switch>
    </BrowserRouter>
  </Provider>,
  element,
);
