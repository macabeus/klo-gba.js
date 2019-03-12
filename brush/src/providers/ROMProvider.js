import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ROMContext from '../context/ROMContext'

const ROMProvider = (props) => {
  const [romBuffer, setROMBuffer] = useState(null)

  return (
    <ROMContext.Provider
      value={{
        romBuffer,
        setROMBuffer,
      }}
    >
      {props.children}
    </ROMContext.Provider>
  )
}

ROMProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ROMProvider
