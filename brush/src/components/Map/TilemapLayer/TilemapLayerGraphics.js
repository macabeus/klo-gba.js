import React from 'react'
import PropTypes from 'prop-types'
import * as PIXI from 'pixi.js'
import { Graphics } from '@inlet/react-pixi'

// This component needs to be a class because we need to get its ref
// eslint-disable-next-line react/prefer-stateless-function
class TilemapLayerGraphics extends React.Component {
  render () {
    const {
      height,
      tileTextures,
      tilemap,
      width,
    } = this.props

    const totalTiles = height * width

    return (
      <Graphics
        draw={(g) => {
          g.removeChildren()

          for (let tileIndex = 0; tileIndex < totalTiles; tileIndex += 1) {
            const tile = tilemap[tileIndex]
            if (tile !== 0x00) {
              const x = tileIndex % width
              const y = (Math.floor(tileIndex / width))

              const texture = tileTextures[tile]
              const sprite = new PIXI.Sprite(texture)

              sprite.x = x * 8
              sprite.y = y * 8

              g.addChild(sprite)
            }
          }
        }}
      />
    )
  }
}

TilemapLayerGraphics.propTypes = {
  height: PropTypes.number.isRequired,
  tilemap: PropTypes.object.isRequired,
  tileTextures: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
}

export default TilemapLayerGraphics
