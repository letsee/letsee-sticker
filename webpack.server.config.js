const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const DotenvWebpack = require('dotenv-webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const envFile = './.env';
dotenv.config({ path: envFile });
const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
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
    ext[mod] = `commonjs ${mod}`;
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
  plugins: isDev ? [
    new CleanWebpackPlugin(['server.bundle.js']),
    new DotenvWebpack({
      path: envFile,
    }),
  ] : [
    new CleanWebpackPlugin(['server.bundle.js']),
    new DotenvWebpack({
      path: envFile,
    }),
    new UglifyJSPlugin({
      comments: false,
    }),
  ],
};
