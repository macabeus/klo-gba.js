import { useState } from 'react'
import getScaledCoordinates, { SIZE } from './getScaledCoordinates'

const withDraggable = (
  scale,
  setX,
  setY
) => (Point) => {
  const [dragging, setDragging] = useState(false)
  const [parent, setParent] = useState(null)

  return {
    ...Point,
    props: {
      ...Point.props,
      draw: (g) => {
        setParent(g.parent)

        Point.props.draw(g)
      },
      interactive: true,
      mousedown: () => setDragging(true),
      mousemove: (event) => {
        if (dragging === false) return

        const newPosition = event.data.getLocalPosition(parent)
        const [newX, newY] = getScaledCoordinates(
          newPosition.x * SIZE,
          newPosition.y * SIZE,
          scale
        )

        setX(newX)
        setY(newY)
      },
      mouseupoutside: () => {
        setDragging(false)
      },
    },
  }
}

export default withDraggable
