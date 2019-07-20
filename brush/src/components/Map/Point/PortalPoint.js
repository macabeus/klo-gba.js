import React from 'react'
import PropTypes from 'prop-types'
import { Graphics } from '@inlet/react-pixi'

const SIZE = 4
const SCALE = 8

const PortalPoint = ({ x, y }) => (
  <Graphics
    draw={(g) => {
      g.clear()

      const color = 0x0000FF
      const radius = SIZE * 2
      const innerRadius = SIZE
      const points = 6
      const scaledX = ((x * innerRadius) / SCALE) + 4
      const scaledY = ((y * innerRadius) / SCALE) - 8

      g.beginFill(color)
      g.drawStar(scaledX, scaledY, points, radius, innerRadius)
    }}
  />
)

PortalPoint.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

export default PortalPoint
