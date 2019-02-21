import React from 'react'
import PropTypes from 'prop-types'
import { Rect } from 'react-konva'

const SIZE = 4

const Point = ({
  color,
  debugMessage,
  x,
  y,
}) => {
  const data = {
    fill: color,
    height: SIZE,
    onClick: () => { console.log(debugMessage) }, // eslint-disable-line no-console
    width: SIZE,
    x: x * SIZE,
    y: y * SIZE,
  }

  return React.createElement(
    Rect,
    data
  )
}

Point.propTypes = {
  color: PropTypes.string.isRequired,
  debugMessage: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

export default Point
