const path = require('path')

const rules = [
  {
    loader: 'file-loader',
    test: /\.wasm$/,
    type: 'javascript/auto',
  },
]

rules.concat()

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  module: {
    rules,
  },
  node: {
    fs: 'empty',
  },
  output: {
    filename: 'scissors.js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, './dist'),
    sourceMapFilename: 'scissors.js.map',
  },
}
