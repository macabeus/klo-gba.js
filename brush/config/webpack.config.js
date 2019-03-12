const HtmlWebPackPlugin = require('html-webpack-plugin')

const formerKitRules = require('./former-kit/webpack.config')

const htmlPlugin = new HtmlWebPackPlugin({
  filename: './index.html',
  template: './src/index.html',
})

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
  plugins: [htmlPlugin],
}
