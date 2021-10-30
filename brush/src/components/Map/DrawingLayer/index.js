import React, { useState } from 'react'
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
  const [cursorCoordinates, setCursorCoordinates] = useState([-1, -1])
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

  const mapCoordinatesToTilePosition = ([x, y]) => {
    const tilePositionX = Math.floor(x / 8)
    const tilePositionY = Math.floor(y / 8)

    return [tilePositionX, tilePositionY]
  }

  const drawDrawingLayerBackground = (g) => {
    g.beginFill(0x000000, 0.01)
    g.drawRect(0, 0, width * 8, height * 8)
    g.endFill()
  }

  const drawSquareCursor = (g) => {
    g.beginFill(0xFFFFFF, 0.2)

    g.lineStyle(1, 0x000000, 0.7)

    const [x, y] = mapCoordinatesToTilePosition(cursorCoordinates)
    g.drawRect(x * 8, y * 8, 8, 8)

    g.endFill()
  }

  const onClickHandler = (x, y) =>
    mapToolToFunc[toolName]({ x, y })

  return (
    <Graphics
      interactive
      draw={(g) => {
        g.clear()

        drawDrawingLayerBackground(g)

        drawSquareCursor(g)
      }}
      pointerdown={() => {
        const [x, y] = mapCoordinatesToTilePosition(cursorCoordinates)
        onClickHandler(x, y)
      }}
      mousemove={(e) => {
        const { x, y } = e.data.global

        const yAboveCursor = y > 8 ?
          y - 8 :
          y

        setCursorCoordinates([x, yAboveCursor])
      }}
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
