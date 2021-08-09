import React from 'react'
import PropTypes from 'prop-types'
import { Graphics } from '@inlet/react-pixi'

const DrawingLayer = ({
  getTilemapPoint,
  height,
  setSelectedPointInfos,
  setToolState,
  toolState,
  updateTilemapLayer,
  updateTilemapPoint,
  width,
}) => {
  const { name: toolName, value: toolValue } = toolState

  const mapToolToFunc = {
    brush: ({ x, y }) => {
      updateTilemapPoint(x, y, toolValue)
      updateTilemapLayer()
    },

    eraser: ({ x, y }) => {
      updateTilemapPoint(x, y, toolValue)
      updateTilemapLayer()
    },

    eyedropper: ({ x, y }) => {
      const tileId = getTilemapPoint(x, y)

      if (tileId === 0x00) {
        setToolState('eraser')
        return
      }

      setToolState('brush', tileId)
    },

    inspector: ({ x, y }) => {
      const tileId = getTilemapPoint(x, y)
      const hexTileId = `0x${tileId.toString(16).toUpperCase()}`
      const tilemapPointInfos = {
        message: `Tile ${hexTileId}`,
        x,
        y,
      }

      setSelectedPointInfos(tilemapPointInfos)
    },
  }

  const onClickHandler = (x, y) =>
    mapToolToFunc[toolName]({ x, y })

  return (
    <Graphics
      draw={(g) => {
        g.clear()

        g.beginFill(0x000000, 0.01)
        g.drawRect(0, 0, width * 8, height * 8)
      }}
      interactive
      pointerdown={e =>
        onClickHandler(
          Math.floor(e.data.global.x / 8),
          Math.floor(e.data.global.y / 8)
        )}
    />
  )
}

DrawingLayer.propTypes = {
  getTilemapPoint: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  setSelectedPointInfos: PropTypes.func.isRequired,
  setToolState: PropTypes.func.isRequired,
  toolState: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
  }).isRequired,
  updateTilemapLayer: PropTypes.func.isRequired,
  updateTilemapPoint: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
}

export default DrawingLayer
