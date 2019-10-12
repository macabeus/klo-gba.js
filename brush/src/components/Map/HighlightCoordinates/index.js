import React from 'react'
import PropTypes from 'prop-types'
import { Graphics } from '@inlet/react-pixi'

const SIZE = 4
const OBJECTS_SCALE = 8

const HighlightCoordinates = ({
  coordinates,
  height,
  width,
}) => {
  const [x, y] = coordinates
  const xScaled = ((x * SIZE) / OBJECTS_SCALE) - 2
  const yScaled = ((y * SIZE) / OBJECTS_SCALE) - 2

  return (
    <Graphics
      draw={(g) => {
        g.clear()

        g.lineStyle(4, 0x000000, 0.4)
          .moveTo(0, yScaled)
          .lineTo(width * 4, yScaled)

        g.lineStyle(4, 0x000000, 0.4)
          .moveTo(xScaled, 0)
          .lineTo(xScaled, height * 4)
      }}
    />
  )
}

HighlightCoordinates.propTypes = {
  coordinates: PropTypes.arrayOf(PropTypes.number),
  height: PropTypes.number,
  width: PropTypes.number,
}

HighlightCoordinates.defaultProps = {
  coordinates: [-1, -1],
  height: -1,
  width: -1,
}

export default HighlightCoordinates
