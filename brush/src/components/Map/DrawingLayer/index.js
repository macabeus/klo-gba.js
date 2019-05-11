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
    brush: ({ ref, x, y }) => {
      ref.changeTile(toolValue)
      updateTilemapPoint(x, y, toolValue)
    },

    magnifyingGlass: ({ ref }) => {
      ref.clickHandle()
    },
  }

  const onClickHandler = (x, y) => {
    const ref = getPointRef(x, y)
    mapToolToFunc[toolName]({ ref, x, y })
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
