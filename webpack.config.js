const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/js/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [

    ]
  }
};
