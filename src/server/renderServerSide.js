import 'babel-polyfill';
import React from 'react';
import Helmet from 'react-helmet';
import { resolve } from 'path';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter, Route, Switch, matchPath } from 'react-router-dom';
import sass from 'node-sass';
import _ from 'lodash';
import serialize from 'serialize-javascript';
import routes from '../routes';
import helmetconfig from '../appConfig';
import configureStore from '../redux/store';

const theme = sass.renderSync({
  file: 'node_modules/grommet/scss/vanilla/index.scss',
  includePaths: [resolve(__dirname, '../../node_modules')],
  outputStyle: 'compressed',
});

const renderFullPage = (html, preloadedState) => {
  const head = Helmet.rewind();
  let vendorJS = ''; let bundleCSS = ''; let bundleJS = '/bundle.js';
  if (process.env.NODE_ENV !== 'development') {
    const assets = require('../../webpack-assets.json');
    bundleJS = assets.bundle.js;
    bundleCSS = assets.bundle.css;
    vendorJS = assets.vendor.js;
  }
  return `
    <!DOCTYPE html>
    <html ${head.htmlAttributes.toString()}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        ${head.title.toString()}
        ${head.base.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        <link rel="stylesheet" type="text/css" href=${bundleCSS}>
        <style>${theme.css}</style>
      </head>
      <body>
        <div id="app-container">${html}</div>
        <script>window.__PRELOADED_STATE__ = ${serialize(preloadedState, { isJSON: true })}</script>
        <script src=${vendorJS}></script>
        <script src=${bundleJS}></script>
      </body>
    </html>
    `;
};

function serverRender(req, res) {
  const store = configureStore();
  const loadRouteData = () => {
    const promises = [];

    routes.some((route) => {
      const match = matchPath(req.url, route);
      if (match && route.loadData) promises.push(route.loadData(store.dispatch, match.params));
      return match;
    });

    return Promise.all(promises);
  };

  loadRouteData()
    .then(() => {
      const context = {};
      const componentStr = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <div>
              <Helmet {...helmetconfig} />
              <Switch>{routes.map(route => <Route key={_.uniqueId()} exact={route.exact || false} path={route.path} render={props => (<route.component {...props} routes={route.routes || null} />)} />)}</Switch>
            </div>
          </StaticRouter>
        </Provider>);
      if (context.url) {
        res.status(301).setHeader('Location', context.url);
        res.end();
        return;
      }
      const status = context.status === '404' ? 404 : 200;
      res.status(status).send(renderFullPage(componentStr, store.getState()));
    })
    .catch((err) => {
      res.status(404).send('Not Found :(');
      console.error(`==> 😭  Rendering routes error: ${err}`);
    });
}

module.exports = serverRender;
