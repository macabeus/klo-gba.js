import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import * as PIXI from 'pixi.js'
import { Stage } from '@inlet/react-pixi'
import VisionContext from '../../context/VisionContext'
import TilesetGraphics from './TilesetGraphics'
import useWhenVisionChanges from '../../hooks/useWhenVisionChanges'

const TileSet = ({ setToolState }) => {
  const {
    vision: {
      infos: {
        index,
        world,
      },
      palette,
      tileset,
    },
  } = useContext(VisionContext)
  const [pixiApplication, setPixiApplication] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(null)
  const [currentWorld, setCurrentWorld] = useState(null)

  useWhenVisionChanges(() => {
    setCurrentIndex(index)
    setCurrentWorld(world)
  })

  if (pixiApplication !== null) {
    pixiApplication.renderer.plugins.interaction.destroy()
    pixiApplication.renderer.plugins.interaction =
      new PIXI.interaction.InteractionManager(pixiApplication.renderer)

    pixiApplication.render()
  }

  if (tileset === undefined) {
    return <span>empty</span>
  }

  return (
    <Stage
      width={8 * 10}
      height={(Math.ceil(tileset.length / 10) * 8)}
      options={{
        antialias: false,
        transparent: true,
      }}
      onMount={setPixiApplication}
    >
      {
        pixiApplication && (
          <TilesetGraphics
            pixiRenderer={pixiApplication.renderer}
            index={currentIndex}
            world={currentWorld}
            tileset={tileset}
            palette={palette}
            setToolState={setToolState}
          />
        )
      }
    </Stage>
  )
}

TileSet.propTypes = {
  setToolState: PropTypes.func.isRequired,
}

export default TileSet
