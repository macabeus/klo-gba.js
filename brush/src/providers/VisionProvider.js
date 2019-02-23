import React, { useState } from 'react'
import PropTypes from 'prop-types'
import getVision from '../get-vision'
import VisionContext from '../context/VisionContext'

const VisionProvider = (props) => {
  const [visionWorld, setVisionWorld] = useState(1)
  const [visionIndex, setVisionIndex] = useState(1)

  const [vision, setVision] = useState(getVision(visionWorld, visionIndex))

  const visionUpdate = (world, index) => {
    setVisionWorld(world)
    setVisionIndex(index)

    setVision(getVision(world, index))
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
