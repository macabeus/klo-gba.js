import React from 'react'
import PropTypes from 'prop-types'
import { Graphics } from '@inlet/react-pixi'
import { range } from 'ramda'

const GridLayer = ({ height, width }) => (
  <Graphics
    draw={(g) => {
      g.clear()

      range(0, height).forEach(i =>
        g.lineStyle(1, 0x000000, 0.2)
          .moveTo(0, i * 4)
          .lineTo(width, i * 4))

      range(0, width).forEach(i =>
        g.lineStyle(1, 0x000000, 0.2)
          .moveTo(i * 4, 0)
          .lineTo(i * 4, height))
    }}
  />
)

GridLayer.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
}

export default GridLayer
