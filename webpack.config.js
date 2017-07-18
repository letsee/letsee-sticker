const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : false,
  entry: {
    react: [
      'react',
      'react-dom',
    ],
    vendor: [
      'normalize.css',
      'babel-polyfill',
      'es6-promise',
      'isomorphic-fetch',
      'lodash',
    ],
    bundle: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js',
    publicPath: process.env.PUBLIC_PATH || '/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    host: '192.168.1.192',
    port: 8000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1, camelCase: true, minimize: process.env.NODE_ENV === 'production' } },
            'postcss-loader',
          ],
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1, camelCase: true, minimize: process.env.NODE_ENV === 'production' } },
            'postcss-loader',
            'sass-loader',
          ],
        }),
      },
      {
        test: /\.(gif|png|jpg|jpeg)$/,
        loader: 'file-loader',
        query: {
          outputPath: 'img/',
        },
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: './.env',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['react', 'vendor', 'manifest'],
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css',
      allChunks: true,
    }),
    new UglifyJSPlugin({
      comments: false,
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html.ejs',
    }),
  ],
};
