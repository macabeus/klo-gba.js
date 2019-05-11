import React from 'react'
import PropTypes from 'prop-types'
import { Layer, Line } from 'react-konva'
import { range } from 'ramda'

const GridLayer = ({ height, width }) => {
  const linesX = range(0, height).map(i => (
    <Line
      points={[0, i * 4, width * 4, i * 4]}
      strokeWidth={1}
      stroke="black"
      opacity={0.25}
      key={`${i}X`}
    />))

  const linesY = range(0, width).map(i => (
    <Line
      points={[i * 4, 0, i * 4, height * 4]}
      strokeWidth={1}
      stroke="black"
      opacity={0.25}
      key={`${i}Y`}
    />))

  const lines = linesX.concat(linesY)

  return (
    <Layer>
      {lines}
    </Layer>
  )
}

GridLayer.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
}

export default GridLayer
