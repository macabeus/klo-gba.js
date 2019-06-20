import React from 'react'
import PropTypes from 'prop-types'
import { Layer, Rect } from 'react-konva'
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
    <Layer
      onClick={(e) => {
        onClickHandler(
          Math.floor(e.evt.layerX / 4),
          Math.floor(e.evt.layerY / 4)
        )
      }}
    >
      <Rect height={height} width={width} />
    </Layer>
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
