const path = require('path');

module.exports = {
  mode:'development',
  entry: './js/demo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'demo.js'
  }
};