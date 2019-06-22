import React from 'react'
import PropTypes from 'prop-types'
import { Star } from 'react-konva'

const SIZE = 4
const SCALE = 8

const PortalPoint = ({ x, y }) => (
  <Star
    stroke="blue"
    strokeWidth={2}
    height={SIZE * 4}
    width={SIZE * 4}
    x={
      ((x * SIZE) / SCALE) - (SIZE - 8)
    }
    y={
      ((y * SIZE) / SCALE) - SIZE
    }
  />
)

PortalPoint.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

export default PortalPoint
