import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { enteringVisionGbaState, getVision } from 'scissors'
import { GbaContext } from 'react-gbajs'
import VisionContext from '../context/VisionContext'
import useForceUpdate from '../hooks/useForceUpdate'

const VisionProvider = ({ children }) => {
  const { updateState } = useContext(GbaContext)

  const [visionWorld, setVisionWorld] = useState(1)
  const [visionIndex, setVisionIndex] = useState(1)

  const forceUpdate = useForceUpdate()

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

  const gbaEnterVision = (world, index, newRomBuffer = undefined) =>
    updateState({
      newRomBuffer,
      restoreState: enteringVisionGbaState(world, index),
    })

  const updateTilemapPoint = (x, y, newTileId) => {
    vision.tilemap[x + (y * vision.infos.tilemap.width)] = newTileId
  }

  const getTilemapPoint = (x, y) =>
    vision.tilemap[x + (y * vision.infos.tilemap.width)]

  const updateObjectsDiffMap = (index, key, value) => {
    if (key === 'kind') {
      vision.objects[index].data.kind = value
    }

    if (vision.objectsDiffMap[index] === undefined) {
      vision.objectsDiffMap[index] = {}
    }

    vision.objectsDiffMap[index][key] = value

    forceUpdate()
  }

  return (
    <VisionContext.Provider value={{
      gbaEnterVision,
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
