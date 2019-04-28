import React from 'react'
import PropTypes from 'prop-types'
import { Layer, Rect } from 'react-konva'
import { getPointRef } from '../global-state'

const DrawingLayer = ({
  height,
  selectedTileIdInSet,
  width,
}) => {
  const currentTool = selectedTileIdInSet ?
    'brush' :
    'magnifyingGlass'

  const mapToolToFunc = {
    brush: ({ ref }) => {
      ref.changeTile(selectedTileIdInSet)
    },

    magnifyingGlass: ({ ref }) => {
      ref.clickHandle()
    },
  }

  const onClickHandler = (x, y) => {
    const ref = getPointRef(x, y)
    mapToolToFunc[currentTool]({ ref })
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
  width: PropTypes.number.isRequired,
}

DrawingLayer.defaultProps = {
  selectedTileIdInSet: null,
}

export default DrawingLayer
