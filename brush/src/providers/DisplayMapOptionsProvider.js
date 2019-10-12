import React, { useState } from 'react'
import PropTypes from 'prop-types'
import DisplayMapOptionsContext from '../context/DisplayMapOptionsContext'
import { zoomValues, defaultZoomIndex } from '../constants/zoomValues'

const DisplayMapOptionsProvider = ({ children }) => {
  const [zoom, setZoom] = useState(zoomValues[defaultZoomIndex])
  const [showGrid, setShowGrid] = useState(false)
  const [showObjects, setShowObjects] = useState(true)
  const [showPortals, setShowPortals] = useState(true)

  return (
    <DisplayMapOptionsContext.Provider
      value={{
        options: {
          showGrid,
          showObjects,
          showPortals,
          zoom,
        },
        setOptions: {
          setShowGrid,
          setShowObjects,
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
