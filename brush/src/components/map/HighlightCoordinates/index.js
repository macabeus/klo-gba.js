import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Line } from 'react-konva'

const SIZE = 4
const OAM_SCALE = 8

const HighlightCoordinates = ({
  coordinates,
  height,
  width,
}) => {
  const [x, y] = coordinates
  const xScaled = ((x * SIZE) / OAM_SCALE) - 2
  const yScaled = ((y * SIZE) / OAM_SCALE) - 3

  return (
    <Fragment>
      <Line
        points={[0, yScaled, width * 4, yScaled]}
        strokeWidth={4}
        stroke="black"
        opacity={0.4}
      />
      <Line
        points={[xScaled, 0, xScaled, height * 4]}
        strokeWidth={4}
        stroke="black"
        opacity={0.4}
      />
    </Fragment>
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
