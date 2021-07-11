import React from 'react'
import PropTypes from 'prop-types'
import {
  drop,
  splitEvery,
  range,
} from 'ramda'
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
      vision: {
        infos: {
          tilemap: {
            scheme,
          },
        },
        tilemap,
        tilemapSize: {
          height,
          width,
        },
      },
    } = this.props

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

    const rgb2hex = (rgb) =>
      ((rgb[0] << 16) + (rgb[1] << 8) + rgb[2])

    const { palette, tileset } = window
    const tilesetList =
      splitEvery(64, tileset)

    const drawTile = (g, tile, offsetX, offsetY, repeat) => {
      for (let r = 0; r < repeat; r += 1) {
        for (let tileIndex = 0; tileIndex < (8 * 8); tileIndex += 1) {
          const paletteIndex = tile[tileIndex]

          const x = tileIndex % 8
          const y = (Math.floor(tileIndex / 8)) + (r * 8)

          const [red, green, blue] = palette[paletteIndex]
          g.beginFill(rgb2hex([red, green, blue]))
          g.drawRect(x + (offsetX), y + (offsetY), 1, 1)
        }
      }
    }

    return (
      <Graphics
        draw={(g) => {
          g.clear()

          for (let index = 0; index < tilemapOptimized.length; index += 1) {
            const i = tilemapOptimized[index]

            if (i.tileValue === 0x00) {
              continue
            }

            const offsetX = i.x * 8
            const offsetY = i.y * 8

            drawTile(g, tilesetList[i.tileValue], offsetX, offsetY, i.size)
          }
        }}
      />
    )
  }
}

TilemapLayer.propTypes = {
  vision: PropTypes.shape({
    infos: PropTypes.shape({
      tilemap: PropTypes.shape({
        scheme: PropTypes.arrayOf(PropTypes.shape({
          ids: PropTypes.arrayOf(PropTypes.number).isRequired,
          name: PropTypes.string.isRequired,
        })),
      }).isRequired,
    }).isRequired,
    tilemap: PropTypes.object.isRequired,
    tilemapSize: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
}

export default TilemapLayer
