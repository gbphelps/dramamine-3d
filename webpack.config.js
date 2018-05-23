var path = require('path');

module.exports = {
  entry: './javascripts/game.js',
  output: {
    path: path.resolve(__dirname, 'javascripts'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        },
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '*']
  }
};
