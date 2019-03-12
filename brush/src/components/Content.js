import React, { useContext } from 'react'
import ROMContext from '../context/ROMContext'
import InputROM from './InputROM'
import Map from './map'

const Content = () => {
  const { romBuffer } = useContext(ROMContext)

  if (romBuffer) {
    return <Map />
  }

  return <InputROM />
}

export default Content
