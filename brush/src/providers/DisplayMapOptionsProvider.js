import React, { useState } from 'react'
import PropTypes from 'prop-types'
import DisplayMapOptionsContext from '../context/DisplayMapOptionsContext'

const DisplayMapOptionsProvider = ({ children }) => {
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
        },
        setOptions: {
          setShowGrid,
          setShowOAM,
          setShowPortals,
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
