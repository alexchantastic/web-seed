const config = require('./webpack.config.js');

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin'),
      merge = require('webpack-merge');

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
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/public/index.html'
    })
  ],
  devtool: 'cheap-eval-source-map',
  devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, 'dist')
  }
};

module.exports = merge(devConfig, config);
