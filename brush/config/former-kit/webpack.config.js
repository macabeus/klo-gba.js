const stylelintFormatter = require('./stylelintFormatter')
const postcssUrlRebase = require('./postcssUrlRebase')

const postCSSPlugins = [
  require('postcss-sass-each'),
  require('postcss-hexrgba'),
  require('postcss-import'),
  require('postcss-url')({
    url: postcssUrlRebase,
  }),
]

const postcssNextWhitoutCustomProps = require('postcss-cssnext')({
  features: {
    customProperties: false,
  },
})

module.exports = [
  {
    test: /\.css$/,
    exclude: /react-dates/,
    enforce: 'pre',
    use: [
      {
        loader: require.resolve('postcss-loader'),
        options: {
          // ident: 'postcss',
          formatter: stylelintFormatter,
          plugins: () => [
            require('stylelint'),
            ...postCSSPlugins,
            require('postcss-cssnext')({
              features: {
                customProperties: {
                  strict: false,
                },
              },
            }),
          ],
        },
      },
    ],
  },
  {
    test: /.*\.css$/,
    exclude: /react-dates/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
          modules: true,
          localIdentName: '[path]-[name]-[local]',
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss',
          importLoaders: 1,
          sourceMap: 'inline',
          plugins: () => [
            ...postCSSPlugins,
            postcssNextWhitoutCustomProps,
          ],
        },
      },
    ],
  },
  {
    // This block matches only react-dates styles and extract them
    // separately, in a pipeline without CSS modules, as react-dates
    // uses global CSS. This is the place where all global CSS libraries
    // should be matched. Be sure to also edit the exclude regex from
    // previous test.
    test: /.*react-dates.*\.css$/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss',
          plugins: () => [
            ...postCSSPlugins,
            postcssNextWhitoutCustomProps,
          ],
        },
      },
    ],
  },
  {
    test: /\.svg$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
      },
      {
        loader: require.resolve('@svgr/webpack'),
        options: {
          replaceAttrValues: {
            '#000': 'currentColor',
            '#000000;': 'currentColor',
          },
          svgoConfig: {
            plugins: {
              removeViewBox: false,
            },
          },
          titleProp: true,
        },
      },
    ],
  },
  {
    test: /\.(woff|woff2|eot|ttf)$/,
    loader: require.resolve('file-loader'),
    options: {
      name: 'static/media/[name].[hash:8].[ext]',
    },
  },
]
