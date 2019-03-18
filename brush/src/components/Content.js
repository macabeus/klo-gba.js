import React, { useContext } from 'react'
import ROMContext from '../context/ROMContext'
import Map from './map'
import InputROMModal from './InputROMModal'

const Content = () => {
  const { romBuffer } = useContext(ROMContext)

  if (romBuffer) {
    return <Map />
  }

  return <InputROMModal />
}

export default Content
