import React from 'react'
import PropTypes from 'prop-types'
import { Graphics } from '@inlet/react-pixi'
import { fromSchemeGetTileNameById } from 'scissors'

const DrawingLayer = ({
  getTilemapPoint,
  height,
  resolution,
  scheme,
  setSelectedPointInfos,
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

    inspector: ({ x, y }) => {
      const tileId = getTilemapPoint(x, y)
      const tilemapPointInfos = {
        message: `Tile ${fromSchemeGetTileNameById(scheme)(tileId)} (${tileId})`,
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
        g.drawRect(0, 0, width * 4 * resolution, height * 4 * resolution)
      }}
      interactive
      pointerdown={e =>
        onClickHandler(
          Math.floor(e.data.global.x / 4 / resolution),
          Math.floor(e.data.global.y / 4 / resolution)
        )
      }
    />
  )
}

DrawingLayer.propTypes = {
  getTilemapPoint: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  resolution: PropTypes.number.isRequired,
  scheme: PropTypes.arrayOf(PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.number).isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  setSelectedPointInfos: PropTypes.func.isRequired,
  toolState: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
  }).isRequired,
  updateTilemapLayer: PropTypes.func.isRequired,
  updateTilemapPoint: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
}

export default DrawingLayer
