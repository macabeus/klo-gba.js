import React, { useState } from 'react'
import { identity } from 'ramda'
import PropTypes from 'prop-types'
import { Graphics } from '@inlet/react-pixi'
import getScaledCoordinates, { SIZE } from './getScaledCoordinates'
import withDraggable from './withDraggable'

const Point = ({
  color,
  draggable,
  hasStroke,
  onClickHandle,
  onFinishDragAndDropHandle,
  onHoverHandle,
  scale,
  size,
  x,
  y,
}) => {
  const [isHover, setIsHover] = useState(false)
  const [colour, alpha] = color
  const height = SIZE * size
  const width = SIZE
  const [rawX, setRawX] = useState(x)
  const [rawY, setRawY] = useState(y)
  const [scaledX, scaledY] = getScaledCoordinates(rawX, rawY, scale)

  const hoc = draggable ?
    withDraggable(
      onFinishDragAndDropHandle,
      scale,
      rawX,
      rawY,
      setRawX,
      setRawY
    ) :
    identity

  return hoc(<Graphics
    draw={(g) => {
      g.clear()

      g.beginFill(colour, alpha)

      const borderWidth = isHover ?
        3 :
        1

      if (hasStroke) {
        g.lineStyle(borderWidth, 0x777777, 1)
      }

      g.drawRect(scaledX, scaledY, width, height)
    }}
    pointerdown={onClickHandle}
    pointerover={() => {
      onHoverHandle()
      setIsHover(true)
    }}
    pointerout={() => setIsHover(false)}
  />)
}

Point.propTypes = {
  color: PropTypes.arrayOf(PropTypes.number).isRequired,
  hasStroke: PropTypes.bool,
  onClickHandle: PropTypes.func,
  onHoverHandle: PropTypes.func,
  scale: PropTypes.number,
  size: PropTypes.number,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

Point.defaultProps = {
  hasStroke: false,
  onClickHandle: () => {},
  onHoverHandle: () => {},
  scale: 1,
  size: 1,
}

export default Point
