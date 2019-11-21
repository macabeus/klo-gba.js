import React, { useContext, useState } from 'react'
import GBAEmulator from 'react-gbajs'
import useWhenVisionChanges from '../../hooks/useWhenVisionChanges'
import ROMContext from '../../context/ROMContext'

const Emulator = () => {
  const { romBufferMemory } = useContext(ROMContext)
  const [foo, setFoo] = useState(1)

  useWhenVisionChanges(() => {
    setFoo(2)
  })

  return (
    <>
      <GBAEmulator romBufferMemory={romBufferMemory} volume={0} foo={foo} />
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
