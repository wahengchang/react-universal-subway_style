import 'babel-polyfill';

import React from 'react';
import { resolve } from 'path';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter, Route, Switch, matchPath } from 'react-router-dom';
import sass from 'node-sass';
import routes from './routes';
import configureStore from './store';

const theme = sass.renderSync({
  file: 'node_modules/grommet/scss/vanilla/index.scss',
  includePaths: [resolve(__dirname, '../node_modules')],
});

const renderFullPage = (html, preloadedState) => {
  let vendorJS = ''; let bundleCSS = '';
  if (process.env.NODE_ENV !== 'development') {
    bundleCSS = '/bundle.css'; vendorJS = '/vendor.js';
  }
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>React Universal Subway Style</title>
        <link rel="stylesheet" type="text/css" href=${bundleCSS}>
        <style>${theme.css}</style>
      </head>
      <body>
        <div id="app-container">${`<div>${html}</div>`}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src=${vendorJS}></script>
        <script src="/bundle.js"></script>
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
            <Switch>
              {
                routes.map((route, index) => <Route key={`route${index}`} {...route} />)
              }
            </Switch>
          </StaticRouter>
        </Provider>);
      if (context.url) {
        res.status(301).setHeader('Location', context.url);
        res.end();
        return;
      }
      const status = context.status === '404' ? 404 : 200;
      res.status(status).send(renderFullPage(componentStr, store.getState()));
    });
}

module.exports = serverRender;
