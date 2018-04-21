const config = require('./webpack.config.js');

const merge = require('webpack-merge'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const prodConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              minimize: true
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css'
    }),
    new UglifyJsPlugin()
  ]
};

module.exports = merge(prodConfig, config);