import React, { useContext } from 'react'
import GBAEmulator from 'react-gbajs'
import ROMContext from '../../context/ROMContext'

const Emulator = () => {
  const { romBufferMemory } = useContext(ROMContext)

  return (
    <>
      <GBAEmulator romBufferMemory={romBufferMemory} volume={0} />
      <span>
        Controls:{' '}
        <strong>z</strong> → a;{' '}
        <strong>x</strong> → b;{' '}
        <strong>start</strong> → enter
      </span>
    </>
  )
}

export default Emulator
