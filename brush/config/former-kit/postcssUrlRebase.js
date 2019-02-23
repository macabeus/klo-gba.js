const path = require('path')
const { normalize } = require('postcss-url/src/lib/paths')

module.exports = function postcssUrlRewrite (asset, dir) {
  const rebasedUrl = normalize(
    path.relative(dir.to, asset.absolutePath)
  )

  return `./${rebasedUrl}${asset.search}${asset.hash}`
}
