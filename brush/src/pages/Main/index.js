import React, { useContext } from 'react'
import ROMContext from '../../context/ROMContext'
import EmptyRom from './EmptyRom'
import LoadedRom from './LoadedRom'
import './style.css'

const Main = () => {
  const { romBufferStatus } = useContext(ROMContext)

  const contentStates = {
    empty: EmptyRom,
    loaded: LoadedRom,
    starting: () => null,
  }

  return React.createElement(contentStates[romBufferStatus])
}

export default Main
