var webpack = require('webpack');
const path = require('path');

require('custom-env').env(true)

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|server\.js/,
        loader: 'babel-loader'
      },
      {
        test: /\.svg/,
        loader: 'file-loader'
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin(["NODE_ENV", "API_HOST"])
  ]
};