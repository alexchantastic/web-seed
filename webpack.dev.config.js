const config = require('./webpack.config.js');

const path = require('path');

const merge = require('webpack-merge');

const devConfig = {
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, 'dist')
  }
};

module.exports = merge(devConfig, config);
