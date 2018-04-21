const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin'),
      webpack = require('webpack');

let devServer;

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
      {
        test: /\.(svg|png|jpg|gif)$/,
        include: /images/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].[ext]' }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        include: /fonts/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].[ext]' }
          }
        ]
      },
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
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    reloadHtml
  ],
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    before(app, server) {
      devServer = server;
    }
  }
};

function reloadHtml() {
  this.plugin('compilation', thing =>
    thing.plugin('html-webpack-plugin-after-emit', trigger)
  );

  const cache = {};

  function trigger(data, callback) {
    const orig = cache[data.outputName];
    const html = data.html.source();

    if (orig && orig !== html) {
      devServer.sockWrite(devServer.sockets, 'content-changed');
    }

    cache[data.outputName] = html;

    callback();
  }
}
