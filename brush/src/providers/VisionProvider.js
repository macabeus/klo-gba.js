import React, { useState } from 'react'
import PropTypes from 'prop-types'
import scissors from 'scissors'
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

  const visionUpdate = (romBuffer, world, index) => {
    setVisionWorld(world)
    setVisionIndex(index)

    const newVision = scissors.getVision(romBuffer, world, index)
    newVision.state = 'selected'
    newVision.infos.world = world
    newVision.infos.index = index
    setVision(newVision)
  }

  return (
    <VisionContext.Provider value={{
        vision,
        visionIndex,
        visionUpdate,
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
