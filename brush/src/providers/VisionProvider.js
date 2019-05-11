import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { getVision } from 'scissors'
import VisionContext from '../context/VisionContext'

const VisionProvider = (props) => {
  const [visionWorld, setVisionWorld] = useState(1)
  const [visionIndex, setVisionIndex] = useState(1)

  const [vision, setVision] = useState({
    infos: { index: 0, tilemap: { height: 0, scheme: [], width: 0 }, world: 0 },
    oam: [],
    state: 'noSelected',
    tilemap: new Uint8Array(),
  })

  const updateVision = (romBuffer, world, index) => {
    setVisionWorld(world)
    setVisionIndex(index)

    const newVision = getVision(romBuffer, world, index)
    newVision.state = 'selected'
    newVision.infos.world = world
    newVision.infos.index = index
    setVision(newVision)
  }

  const updateTilemapPoint = (x, y, newTileId) => {
    vision.tilemap[x + (y * vision.infos.tilemap.width)] = newTileId
  }

  return (
    <VisionContext.Provider value={{
        updateTilemapPoint,
        updateVision,
        vision,
        visionIndex,
        visionWorld,
      }}
    >
      {props.children}
    </VisionContext.Provider>
  )
}

VisionProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default VisionProvider
