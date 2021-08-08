import React, { memo } from 'react'
import PropTypes from 'prop-types'
import * as PIXI from 'pixi.js'
import { Graphics } from '@inlet/react-pixi'
import { renderTilesTexture } from '../../pixiHelpers/renderTextures'

const TilesetGraphics = ({
  palette,
  pixiRenderer,
  setToolState,
  tileset,
}) => {
  const tileTextures = renderTilesTexture(pixiRenderer, tileset, palette)

  const tileIndexToCoordenates = (tileIndex) => {
    const x = tileIndex % 10
    const y = (Math.floor(tileIndex / 10))

    return [x * 8, y * 8]
  }

  const coordenatesToTileIndex = (x, y) => {
    const offsetX = Math.floor(x / 8)
    const offsetY = Math.floor(y / 8) * 10

    return offsetX + offsetY
  }

  return (
    <Graphics
      draw={(g) => {
        g.removeChildren()

        for (
          let tileIndex = 0;
          tileIndex < tileTextures.length;
          tileIndex += 1
        ) {
          const [x, y] = tileIndexToCoordenates(tileIndex)

          const texture = tileTextures[tileIndex]
          const sprite = new PIXI.Sprite(texture)

          sprite.x = x
          sprite.y = y

          g.addChild(sprite)
        }
      }}
      interactive
      pointerdown={e => {
        const tileId = coordenatesToTileIndex(
          e.data.global.x,
          e.data.global.y
        )

        if (tileId === 0) {
          setToolState('eraser')
          return
        }

        setToolState(
          'brush', tileId
        )
      }}
    />
  )
}

TilesetGraphics.propTypes = {
  palette: PropTypes.array.isRequired,
  pixiRenderer: PropTypes.object.isRequired,
  setToolState: PropTypes.func.isRequired,
  tileset: PropTypes.array.isRequired,
}

const memoReuseTilesetGraphics = (Component) => memo(
  Component,
  (previous, next) =>
    (previous.world === next.world)
    && (previous.index === next.index)
)

export default memoReuseTilesetGraphics(TilesetGraphics)
