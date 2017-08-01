const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const env = process.env.NODE_ENV || 'production';
const isDev = env !== 'production' && env !== 'staging';
const publicPath = process.env.PUBLIC_PATH || '/';
const outputPath = path.resolve(__dirname, 'public');

module.exports = [{
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
    path: path.resolve(path.join(outputPath, publicPath)),
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js',
    publicPath,
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
    new Dotenv({
      path: `./.env.${env}`,
    }),
    new webpack.EnvironmentPlugin({
      PUBLIC_PATH: publicPath,
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
    new Dotenv({
      path: `./.env.${env}`,
    }),
    new webpack.EnvironmentPlugin({
      PUBLIC_PATH: publicPath,
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
}, {
  entry: {
    'server.bundle': './server.js',
  },
  output: {
    path: __dirname,
    filename: '[name].js',
  },
  target: 'node',
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server',
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod;
    return ext;
  }, {}),
  node: {
    __filename: false,
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: isDev ? [] : [
    new UglifyJSPlugin({
      comments: false,
    }),
  ],
}];
