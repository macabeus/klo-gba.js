import React, { useState } from 'react'
import PropTypes from 'prop-types'
import DisplayMapOptionsContext from '../context/DisplayMapOptionsContext'
import { zoomValues, defaultZoomIndex } from '../constants/zoomValues'

const DisplayMapOptionsProvider = ({ children }) => {
  const [zoom, setZoom] = useState(zoomValues[defaultZoomIndex])
  const [showGrid, setShowGrid] = useState(false)
  const [showOAM, setShowOAM] = useState(true)
  const [showPortals, setShowPortals] = useState(true)

  return (
    <DisplayMapOptionsContext.Provider
      value={{
        options: {
          showGrid,
          showOAM,
          showPortals,
          zoom,
        },
        setOptions: {
          setShowGrid,
          setShowOAM,
          setShowPortals,
          setZoom,
        },
      }}
    >
      {children}
    </DisplayMapOptionsContext.Provider>
  )
}

DisplayMapOptionsProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DisplayMapOptionsProvider
