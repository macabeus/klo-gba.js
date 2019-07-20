import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { range } from 'ramda'
import { fromSchemeGetTileNameById } from 'scissors'
import BucketPointsTile from '../Point/BucketPointsTile'
import { addPointRef } from '../globalState'
import optimize from './optimize'

const listCoordinates = (height, width) => {
  const rangeHeight = range(0, height)
  const rangeWidth = range(0, width)

  const coordinates = rangeWidth.reduce((acc, i) => {
    rangeHeight.forEach(j => acc.push([i, j]))
    return acc
  }, [])

  return coordinates
}

const TilemapLayer = ({ setSelectedPointInfos, vision }) => {
  const {
    infos: {
      index,
      tilemap: {
        height,
        scheme,
        width,
      },
      world,
    },
    tilemap,
  } = vision

  const getTileNameById = fromSchemeGetTileNameById(scheme)

  const getPoint = (x, y) => {
    const tileValue = tilemap[x + (y * width)]
    const tileName = getTileNameById(tileValue)

    return {
      getTileNameById,
      key: `${world} ${index} ${x} ${y}`,
      ref: (instance) => { addPointRef(x, y, instance, y) },
      showPointInfosHandle: setSelectedPointInfos,
      size: 1,
      tileName,
      tileValue,
      x,
      y,
    }
  }

  const tiles = listCoordinates(height, width)
    .map(([x, y]) => getPoint(x, y))

  const tilemapOptimized = optimize(tiles)

  const bucketsPoints = tilemapOptimized.map(attributes =>
    <BucketPointsTile {...attributes} />)

  return (
    <Fragment>
      {bucketsPoints}
    </Fragment>
  )
}

TilemapLayer.propTypes = {
  setSelectedPointInfos: PropTypes.func,
  vision: PropTypes.shape({
    infos: PropTypes.shape({
      tilemap: PropTypes.shape({
        height: PropTypes.number.isRequired,
        scheme: PropTypes.arrayOf(PropTypes.shape({
          ids: PropTypes.arrayOf(PropTypes.number).isRequired,
          name: PropTypes.string.isRequired,
        })),
        width: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
    tilemap: PropTypes.object.isRequired,
  }).isRequired,
}

TilemapLayer.defaultProps = {
  setSelectedPointInfos: () => {},
}

export default React.memo(TilemapLayer)
