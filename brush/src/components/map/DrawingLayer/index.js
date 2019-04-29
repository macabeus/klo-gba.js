import React from 'react'
import PropTypes from 'prop-types'
import { Layer, Rect } from 'react-konva'
import { getPointRef } from '../global-state'

const DrawingLayer = ({
  height,
  selectedTileIdInSet,
  updateTilemapPoint,
  width,
}) => {
  const currentTool = selectedTileIdInSet ?
    'brush' :
    'magnifyingGlass'

  const mapToolToFunc = {
    brush: ({ ref, x, y }) => {
      ref.changeTile(selectedTileIdInSet)
      updateTilemapPoint(x, y, selectedTileIdInSet)
    },

    magnifyingGlass: ({ ref }) => {
      ref.clickHandle()
    },
  }

  const onClickHandler = (x, y) => {
    const ref = getPointRef(x, y)
    mapToolToFunc[currentTool]({ ref, x, y })
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
  selectedTileIdInSet: PropTypes.number,
  updateTilemapPoint: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
}

DrawingLayer.defaultProps = {
  selectedTileIdInSet: null,
}

export default DrawingLayer
