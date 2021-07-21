import React from 'react'
import PropTypes from 'prop-types'
import { Graphics } from '@inlet/react-pixi'

const LINE_THICKNESS = 8

const HighlightCoordinates = ({
  coordinates,
  height,
  width,
}) => {
  const [x, y] = coordinates
  const xScaled = x - (LINE_THICKNESS / 2)
  const yScaled = y - (LINE_THICKNESS / 2)

  return (
    <Graphics
      draw={(g) => {
        g.clear()

        g.lineStyle(LINE_THICKNESS, 0x000000, 0.4)
          .moveTo(0, yScaled)
          .lineTo(width * 8, yScaled)

        g.lineStyle(LINE_THICKNESS, 0x000000, 0.4)
          .moveTo(xScaled, 0)
          .lineTo(xScaled, height * 8)
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
