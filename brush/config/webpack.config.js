const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const formerKitRules = require('./former-kit/webpack.config')

const htmlPlugin = new HtmlWebPackPlugin({
  favicon: './assets/Klonoa-icon.ico',
  filename: './index.html',
  template: './src/index.html',
})

const copyPlugin = new CopyPlugin([
  {
    from: '../node_modules/scissors/dist/',
    ignore: ['*.js', '*.js.map'],
    to: 'static/wasm/',
  },
])

const rules = [
  { test: /dump\/.*\.bin/, use: 'buffer-loader' },
  {
    exclude: /node_modules/,
    test: /\.js$/,
    use: {
      loader: 'babel-loader',
    },
  },
].concat(formerKitRules)

rules.concat()

module.exports = {
  module: {
    rules,
  },
  plugins: [htmlPlugin, copyPlugin],
}
