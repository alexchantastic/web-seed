const config = require('./webpack.config.js');

const merge = require('webpack-merge'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].bundle.[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
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
      filename: 'styles/[name].[hash].css'
    }),
    new UglifyJsPlugin()
  ]
};

module.exports = merge(config, prodConfig);
