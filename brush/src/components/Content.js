import React, { useContext } from 'react'
import ROMContext from '../context/ROMContext'
import Map from './map'
import InputROMModal from './InputROMModal'

const Content = () => {
  const { romBufferStatus } = useContext(ROMContext)

  const contentStates = {
    empty: <InputROMModal />,
    loaded: <Map />,
    starting: null,
  }

  return contentStates[romBufferStatus]
}

export default Content
