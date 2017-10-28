/* eslint-disable comma-dangle */

const { resolve } = require('path');
const webpack = require('webpack');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = nodeEnv !== 'production';

const vendor = [
  'react',
  'react-dom',
  'redux',
  'axios',
  'lodash',
  'redux-saga',
  'react-redux',
  'react-router-dom',
  'react-helmet',
  'babel-polyfill',
  'jsonwebtoken',
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
  cache: isDev,
  output: {
    path: resolve(__dirname, 'public'),
    filename: isDev ? 'bundle.js' : '[name].[chunkhash:8].js',
    chunkFilename: isDev ? 'bundle.js' : '[name].[chunkhash:8].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        enforce: 'pre',
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'eslint-loader',
            options: { fix: true }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
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
                minimize: true
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
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) } }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity }),
    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
    new ChunkManifestPlugin({ filename: 'chunk-manifest.json', manifestVariable: 'webpackManifest' }),
    new ExtractTextPlugin({ filename: '[name].[chunkhash:8].css', disable: false, allChunks: true }),
    new webpack.optimize.UglifyJsPlugin({ mangle: true, compress: { warnings: false, pure_getters: true, unsafe: true, unsafe_comps: true, screw_ie8: true }, output: { comments: false }, exclude: [/\.min\.js$/gi] }),
    new AssetsPlugin({ filename: 'webpack-assets.json' })
  ]
};

module.exports = config;
