import React from 'react'
import PropTypes from 'prop-types'
import { range } from 'ramda'
import { Graphics } from '@inlet/react-pixi'
import { fromSchemeGetTileNameById } from 'scissors'
import tileNameToColor from '../../../constants/tileNameToColor'
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

// This component needs to be a class because we need to get its ref
class TilemapLayer extends React.Component {
  render () {
    const {
      infos: {
        tilemap: {
          height,
          scheme,
          width,
        },
      },
      tilemap,
    } = this.props.vision

    const getTileNameById = fromSchemeGetTileNameById(scheme)

    const getPoint = (x, y) => {
      const tileValue = tilemap[x + (y * width)]
      const tileName = getTileNameById(tileValue)

      return {
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

    return (
      <Graphics
        draw={(g) => {
          g.clear()

          tilemapOptimized.forEach((i) => {
            const [hexColor, alpha] = tileNameToColor[i.tileName]
            g.beginFill(hexColor, alpha)
            g.drawRect(4 * i.x, 4 * i.y, 4, 4 * i.size)
          })
        }}
      />
    )
  }
}

TilemapLayer.propTypes = {
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

export default TilemapLayer
