import React, { useContext } from 'react'
import GBAEmulator from 'react-gbajs'
import ROMContext from '../../context/ROMContext'

const InputRomModal = () => {
  const { romBufferMemory } = useContext(ROMContext)

  return (
    <>
      <canvas id="screen" width="480" height="320" />
      <button onClick={() => GBAEmulator(romBufferMemory)}>Start emulator</button>
    </>
  )
}

export default InputRomModal
