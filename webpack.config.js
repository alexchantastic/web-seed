const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin'),
      HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin'),
      webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/js/app.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      template: 'index.html'
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    watchContentBase: true
  }
};
