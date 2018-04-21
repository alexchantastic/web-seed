const config = require('./webpack.config.js');

const merge = require('webpack-merge');

const prodConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 2 }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  }
};

module.exports = merge(prodConfig, config);
