const fs = require('fs');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const env = process.env.NODE_ENV || 'production';
const isDev = env !== 'production' && env !== 'staging';

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
};
