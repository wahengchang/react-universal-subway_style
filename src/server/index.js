require('babel-register');
const morgan = require('morgan');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');
const apiMiddleware = require('../apiMiddleware');
const authCheck = require('./authCheck');
const { port, host } = require('../appConfig');

const app = express();

require('css-modules-require-hook')({ generateScopedName: '[name]__[local]___[hash:base64:5]' });

app.use(helmet());
app.use(hpp());
app.use(compression());
app.use(morgan('dev', { skip: (req, res) => res.statusCode < 400 }));
app.use(require('express').static('public'));

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const config = require('../../webpack.config');
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

const whitelist = [`http://${host}`, 'https://www.yourdomain.com'];
const corsOptions = {
  origin: (origin, callback) => {
    if ((whitelist.indexOf(origin) !== -1) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use('/api', cors(corsOptions), authCheck, apiMiddleware);
app.get('*', require('./renderServerSide'));

if (port) {
  app.listen(port, (error) => {
    if (error) console.error(error);
    console.info(`==> 🌎  Listening on port ${port}`);
  });
} else {
  console.error('==> 😭 No PORT environment variable has been specified');
}
