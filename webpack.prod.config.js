const config = require('./webpack.config.js');

const merge = require('webpack-merge'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
            options: { importLoaders: 2 }
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
    })
  ]
};

module.exports = merge(prodConfig, config);
