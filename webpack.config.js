const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const DotenvWebpack = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const envFile = './.env';
dotenv.config({ path: envFile });
const isDev = process.env.NODE_ENV !== 'production';
const publicPath = process.env.PUBLIC_PATH || '/';
const outputPath = path.resolve(path.join(path.resolve(__dirname, 'public'), publicPath));

// webpack client build config
module.exports = {
  devtool: isDev ? 'source-map' : false,
  entry: {
    react: [
      'react',
      'react-dom',
    ],
    vendor: [
      'babel-polyfill',
      'es6-promise',
      'isomorphic-fetch',
    ],
    bundle: './src/index.js',
  },
  output: {
    path: outputPath,
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js',
    publicPath,
  },
  devServer: {
    contentBase: outputPath,
    compress: true,
    host: '0.0.0.0',
    port: 3000,
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
            { loader: 'css-loader', options: { importLoaders: 1, camelCase: true, minimize: !isDev } },
            'postcss-loader',
          ],
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1, camelCase: true, minimize: !isDev } },
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
  plugins: isDev ? [
    new CleanWebpackPlugin(['public', 'views/index.ejs']),
    new DotenvWebpack({
      path: envFile,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['react', 'vendor', 'manifest'],
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'views', 'index.ejs'),
      template: 'src/index.html.ejs',
    }),
  ] : [
    new CleanWebpackPlugin(['public', 'views/index.ejs']),
    new DotenvWebpack({
      path: envFile,
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
      filename: path.resolve(__dirname, 'views', 'index.ejs'),
      template: 'src/index.html.ejs',
    }),
  ],
};
