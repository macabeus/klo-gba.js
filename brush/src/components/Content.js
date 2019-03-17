import React, { useContext } from 'react'
import ROMContext from '../context/ROMContext'
import Map from './map'
import InputModal from './InputModal';

const Content = () => {
  const { romBuffer } = useContext(ROMContext)

  if (romBuffer) {
    return <Map />
  }

  return <InputModal />;
}

export default Content
