/* eslint-disable comma-dangle */

const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = nodeEnv !== 'production';

const vendor = [
  'react',
  'react-dom',
  'redux',
  'react-redux',
  'react-router-dom',
  'redux-thunk',
  'lodash',
  'babel-polyfill'
];

const getEntry = () => {
  // For development
  let entry = [
    'webpack-hot-middleware/client',
    './src/client.js'
  ];
  // For prodcution
  if (!isDev) {
    entry = {
      bundle: ['./src/client.js'],
      vendor
    };
  }
  return entry;
};

const config = {
  devtool: isDev ? 'cheap-eval-source-map' : '',
  entry: getEntry(),
  output: {
    path: resolve(__dirname, 'public'),
    filename: isDev ? 'bundle.js' : '[name].[chunkhash:8].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: { fix: true }
          }
        ],
        exclude: '/node_modules/'
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: '/node_modules/'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules', './node_modules/grommet/node_modules']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: '/node_modules/',
        use: isDev ? [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './postcss.config.js'
              }
            }
          }
        ] : ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[local]',
                minify: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: './postcss.config.js'
                }
              }
            }
          ]
        })
      }
    ]
  },
  plugins: isDev ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin()
  ] : [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new AssetsPlugin({ filename: 'webpack-assets.json' }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity }),
    new ExtractTextPlugin({
      filename: '[name].[chunkhash:8].css',
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
};

module.exports = config;
