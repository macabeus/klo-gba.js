const path = require('path')

const rules = [
  {
    exclude: /node_modules/,
    test: /\.js$/,
    use: {
      loader: 'babel-loader',
    },
  },
  {
    loader: require.resolve('arraybuffer-loader'),
    test: /\.bin$/,
  },
]

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  module: {
    rules,
  },
  output: {
    filename: 'react-gbajs.js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, './dist'),
    sourceMapFilename: 'react-gbajs.js.map',
  },
  externals: {
    react: 'react',
  },
}
