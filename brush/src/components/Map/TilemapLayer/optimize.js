import { last } from 'ramda'

/**
 * This optimizion is very simple and it aims to reduce the number of points on the tilemap.
 * To do it, it just aggregates tiles with the same value.
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

const increaseTheLastTile = (acc) => {
  const lastTile = last(acc)

  acc[acc.length - 1] = {
    ...lastTile,
    size: lastTile.size + 1,
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

      return increaseTheLastTile(acc)
    },
    []
  )

export default optimize
