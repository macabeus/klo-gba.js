import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { getVision } from 'scissors'
import VisionContext from '../context/VisionContext'

const VisionProvider = ({ children }) => {
  const [visionWorld, setVisionWorld] = useState(1)
  const [visionIndex, setVisionIndex] = useState(1)

  const emptyState = {
    infos: { index: 0, tilemap: { height: 0, scheme: [], width: 0 }, world: 0 },
    objects: [],
    objectsDiffMap: {},
    state: 'noSelected',
    tilemap: new Uint8Array(),
  }

  const [vision, setVision] = useState(emptyState)

  const setEmptyState = () => setVision(emptyState)

  const updateVision = (romBuffer, world, index) => {
    setVisionWorld(world)
    setVisionIndex(index)

    const newVision = getVision(romBuffer, world, index)
    newVision.state = 'selected'
    newVision.infos.world = world
    newVision.infos.index = index
    newVision.objectsDiffMap = {}
    setVision(newVision)
  }

  const updateTilemapPoint = (x, y, newTileId) => {
    vision.tilemap[x + (y * vision.infos.tilemap.width)] = newTileId
  }

  const getTilemapPoint = (x, y) =>
    vision.tilemap[x + (y * vision.infos.tilemap.width)]

  const updateObjectsDiffMap = (index, key, value) => {
    if (vision.objectsDiffMap[index] === undefined) {
      vision.objectsDiffMap[index] = {}
    }

    vision.objectsDiffMap[index][key] = value
  }

  return (
    <VisionContext.Provider value={{
      getTilemapPoint,
      setEmptyState,
      updateObjectsDiffMap,
      updateTilemapPoint,
      updateVision,
      vision,
      visionIndex,
      visionWorld,
    }}
    >
      {children}
    </VisionContext.Provider>
  )
}

VisionProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default VisionProvider
