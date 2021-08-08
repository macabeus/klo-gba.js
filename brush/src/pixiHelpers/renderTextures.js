import * as PIXI from 'pixi.js'
import {
  splitEvery,
} from 'ramda'

const rgb2hex = (rgb) =>
  ((rgb[0] << 16) + (rgb[1] << 8) + rgb[2])

const renderTilesTexture = (pixiRenderer, tiles, palette) => {
  const tileTextures = new Array(tiles.length)

  for (let i = 0; i < tiles.length; i += 1) {
    const gr = new PIXI.Graphics()
    gr.height = 8
    gr.width = 8

    const tile = tiles[i]

    for (let tileIndex = 0; tileIndex < (8 * 8); tileIndex += 1) {
      const paletteIndex = tile[tileIndex]

      const x = tileIndex % 8
      const y = (Math.floor(tileIndex / 8))

      const [red, green, blue] = palette[paletteIndex]
      if (red === 0 && green === 0 && blue === 0) {
        gr.beginFill(rgb2hex([0xFF, 0xFF, 0xFF]), 0)
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

const renderObjectsTextures = (pixiRenderer, sprites, palette) => {
  const tileIndexFlatten = [...sprites].map(i => {
    const first4bit = (0b00001111 & i)
    const second4bit = i >> 4

    return [first4bit, second4bit]
  }).flat()

  const tiles =
    tileIndexFlatten
    |> splitEvery(64)

  const tileTextures = renderTilesTexture(pixiRenderer, tiles, palette)

  return tileTextures
}

export { renderTilesTexture, renderObjectsTextures }
