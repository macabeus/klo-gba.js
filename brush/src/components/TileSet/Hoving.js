import React, { memo } from 'react'
import PropTypes from 'prop-types'
import * as PIXI from 'pixi.js'
import { Graphics } from '@inlet/react-pixi'

const Hoving = ({
  tileId,
  tileTexture,
}) => {
  console.log({ tileId, tileTexture })

  return (
    <Graphics
      draw={(g) => {
        g.removeChildren()

        if (tileTexture === null) {
          return
        }

        const sprite = new PIXI.Sprite(tileTexture)

        sprite.x = 120
        sprite.y = 0
        sprite.scale.set(3, 3)

        g.addChild(sprite)
      }}
    />
  )
}

Hoving.propTypes = {
  // tileId: PropTypes.number.isRequired,
  // tileTexture: PropTypes.object.isRequired,
}

const memoReuseHoving = (Component) => memo(
  Component,
  (previous, next) =>
    (previous.tileId === next.tileId)
)

export default memoReuseHoving(Hoving)
