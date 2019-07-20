import React from 'react'
import PropTypes from 'prop-types'
import { Graphics } from '@inlet/react-pixi'
import { getPointRef } from '../globalState'

const DrawingLayer = ({
  height,
  toolState,
  updateTilemapPoint,
  width,
}) => {
  const { name: toolName, value: toolValue } = toolState

  const mapToolToFunc = {
    brush: ({
      paddingY, ref, x, y,
    }) => {
      ref.paintTile(toolValue, paddingY)
      updateTilemapPoint(x, y, toolValue)
    },

    eraser: ({
      paddingY, ref, x, y,
    }) => {
      ref.paintTile(0x00, paddingY)
      updateTilemapPoint(x, y, toolValue)
    },

    magnifyingGlass: ({ paddingY, ref }) => {
      ref.clickHandle(paddingY)
    },
  }

  const onClickHandler = (x, y) => {
    const { paddingY, ref } = getPointRef(x, y)
    mapToolToFunc[toolName]({
      paddingY, ref, x, y,
    })
  }

  return (
    <Graphics
      draw={(g) => {
        g.clear()

        g.beginFill(0x000000, 0.01)
        g.drawRect(0, 0, width * 4, height * 4)
      }}
      interactive
      pointerdown={e =>
        onClickHandler(
          Math.floor(e.data.global.x / 4),
          Math.floor(e.data.global.y / 4)
        )
      }
    />
  )
}

DrawingLayer.propTypes = {
  height: PropTypes.number.isRequired,
  toolState: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
  }).isRequired,
  updateTilemapPoint: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
}

export default DrawingLayer
