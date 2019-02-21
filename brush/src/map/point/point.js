import React from 'react'
import PropTypes from 'prop-types'
import { Rect } from 'react-konva'

const SIZE = 4

const Point = ({
  color,
  debugMessage,
  hasStroke,
  scale,
  x,
  y,
}) => {
  const data = {
    fill: color,
    height: SIZE,
    onClick: () => { console.log(debugMessage) }, // eslint-disable-line no-console
    width: SIZE,
  }

  if (scale === 1) {
    data.x = x * SIZE
    data.y = y * SIZE
  } else {
    data.x = ((x * SIZE) / scale) - SIZE
    data.y = ((y * SIZE) / scale) - SIZE
  }

  if (hasStroke) {
    data.stroke = 'gray'
    data.strokeWidth = 1
  }

  return React.createElement(
    Rect,
    data
  )
}

Point.propTypes = {
  color: PropTypes.string.isRequired,
  debugMessage: PropTypes.string.isRequired,
  hasStroke: PropTypes.bool,
  scale: PropTypes.number,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

Point.defaultProps = {
  hasStroke: false,
  scale: 1,
}

export default Point
