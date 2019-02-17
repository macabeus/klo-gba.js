import React from 'react'
import PropTypes from 'prop-types'
import { Rect } from 'react-konva'

const Point = ({ x, y }) => (
  <Rect
    x={x * 3}
    y={y * 3}
    width={3}
    height={3}
    fill="black"
  />
)

Point.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

export default Point
