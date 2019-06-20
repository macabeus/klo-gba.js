import { range, last } from 'ramda'
import { addPointRef } from '../globalState'

/**
 * This optimizion is very simple and it aims to reduce the number of components on the tilemap.
 * To do it, it just aggregates tiles with the same value and on sequence to the same Point component.
 * Because we are aggregating these points on the same component, we call it as "BucketPointsTile".
 */

const getCurrentAction = (acc, current) => {
  if (acc.length === 0) {
    return 'first-loop'
  }

  if (last(acc).tileValue !== current.tileValue) {
    return 'different-tiles'
  }

  return 'repeated-tile'
}

const increaseTheLastBucket = (acc) => {
  const lastTile = last(acc)
  const { size, x, y } = lastTile

  acc[acc.length - 1] = {
    ...lastTile,
    ref: (instance) => {
      range(0, size + 1).forEach(i =>
        addPointRef(x, y + i, instance, y))
    },
    size: size + 1,
  }

  return acc
}

const optimize = tiles =>
  tiles.reduce(
    (acc, current) => {
      const currentAction = getCurrentAction(acc, current)

      if (currentAction === 'first-loop') {
        acc.push(current)
        return acc
      }

      if (currentAction === 'different-tiles') {
        acc.push(current)
        return acc
      }

      return increaseTheLastBucket(acc)
    },
    []
  )

export default optimize
