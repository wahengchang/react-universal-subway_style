require('babel-register');
const morgan = require('morgan');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const hpp = require('hpp');

const app = express();
const port = process.env.PORT || 3000;

require('css-modules-require-hook')({ generateScopedName: '[name]__[local]___[hash:base64:5]' });

app.use(helmet());
app.use(hpp());
app.use(compression());
app.use(morgan('dev', { skip: (req, res) => res.statusCode < 400 }));
app.use(require('express').static('public'));

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const config = require('../webpack.config');
  const devMiddleware = require('webpack-dev-middleware');
  const hotDevMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(config);
  const devMiddlewareConfig = {
    noInfo: true,
    stats: { colors: true },
    publicPath: config.output.publicPath,
  };
  app.use(devMiddleware(compiler, devMiddlewareConfig));
  app.use(hotDevMiddleware(compiler));
}

app.get('*', require('./renderServerSide'));

if (port) {
  app.listen(port, (error) => {
    if (error) console.error(error);
    console.info(`==> 🌎  Listening on port ${port}`);
  });
} else {
  console.error('==> 😭 No PORT environment variable has been specified');
}
