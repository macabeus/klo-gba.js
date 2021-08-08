import React, { forwardRef, memo } from 'react'
import PropTypes from 'prop-types'
import TilemapLayerGraphics from './TilemapLayerGraphics'
import { renderTilesTexture } from '../../../pixiHelpers/renderTextures'

const TilemapLayer = forwardRef(({
  palette,
  pixiRenderer,
  tileset,
  vision: {
    tilemap,
    tilemapSize: {
      height,
      width,
    },
  },
}, ref) => {
  const tileTextures = renderTilesTexture(pixiRenderer, tileset, palette)

  return (
    <TilemapLayerGraphics
      ref={ref}
      height={height}
      width={width}
      tilemap={tilemap}
      tileTextures={tileTextures}
    />
  )
})

TilemapLayer.propTypes = {
  palette: PropTypes.array.isRequired,
  pixiRenderer: PropTypes.object.isRequired,
  tileset: PropTypes.array.isRequired,
  vision: PropTypes.shape({
    infos: PropTypes.shape({
      tilemap: PropTypes.object.isRequired,
    }).isRequired,
    tilemap: PropTypes.object.isRequired,
    tilemapSize: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
}

const memoReuseTilemapLayer = (Component) => memo(
  Component,
  (previous, next) =>
    (previous.world === next.world)
    && (previous.index === next.index)
)

export default memoReuseTilemapLayer(TilemapLayer)
