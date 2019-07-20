import React from 'react'
import PropTypes from 'prop-types'
import { Graphics } from '@inlet/react-pixi'

const SIZE = 4

const Point = ({
  color,
  hasStroke,
  onClickHandle,
  scale,
  size,
  x,
  y,
}) => {
  const [colour, alpha] = color
  const height = SIZE * size
  const width = SIZE
  const [scaledX, scaledY] = scale === 1 ?
    [
      x * SIZE,
      y * SIZE,
    ] :
    [
      ((x * SIZE) / scale) - SIZE,
      ((y * SIZE) / scale) - SIZE,
    ]

  return (
    <Graphics
      draw={(g) => {
        g.clear()

        g.beginFill(colour, alpha)

        if (hasStroke) {
          g.lineStyle(1, 0x777777, 1)
        }

        g.drawRect(scaledX, scaledY, width, height)
      }}
      interactive={onClickHandle !== null}
      pointerdown={onClickHandle}
    />
  )
}

Point.propTypes = {
  color: PropTypes.arrayOf(PropTypes.number).isRequired,
  hasStroke: PropTypes.bool,
  onClickHandle: PropTypes.func,
  scale: PropTypes.number,
  size: PropTypes.number,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

Point.defaultProps = {
  hasStroke: false,
  onClickHandle: null,
  scale: 1,
  size: 1,
}

export default Point
