import * as PIXI from 'pixi.js'

const rgb2hex = (rgb) =>
  ((rgb[0] << 16) + (rgb[1] << 8) + rgb[2])

const renderTilesetTextures = (pixiRenderer, tileset, palette) => {
  PIXI.utils.destroyTextureCache()

  const tileTextures = new Array(tileset.length)

  for (let i = 0; i < tileset.length; i += 1) {
    const gr = new PIXI.Graphics()
    gr.height = 8
    gr.width = 8

    const tile = tileset[i]

    for (let tileIndex = 0; tileIndex < (8 * 8); tileIndex += 1) {
      const paletteIndex = tile[tileIndex]

      const x = tileIndex % 8
      const y = (Math.floor(tileIndex / 8))

      const [red, green, blue] = palette[paletteIndex]
      if (red === 0 && green === 0 && blue === 0) {
        gr.beginFill(rgb2hex([0xFF, 0xFF, 0xFF]))
      } else {
        gr.beginFill(rgb2hex([red, green, blue]))
      }
      gr.drawRect(x, y, 1, 1)
    }

    const texture = pixiRenderer.generateTexture(gr)
    tileTextures[i] = texture
  }

  return tileTextures
}

export default renderTilesetTextures
