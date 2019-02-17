import HtmlWebPackPlugin from 'html-webpack-plugin'

const htmlPlugin = new HtmlWebPackPlugin({
  filename: './index.html',
  template: './src/index.html',
})

module.exports = {
  module: {
    rules: [
      { test: /dump\/.*\.bin/, use: 'buffer-loader' },
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [htmlPlugin],
}
