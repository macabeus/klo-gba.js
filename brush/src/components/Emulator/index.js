import React, { useContext, useState } from 'react'
import GBAEmulator from 'react-gbajs'
import ROMContext from '../../context/ROMContext'

// const GBAEmulator = () => {
//   const [foo, setFoo] = useState(0)
//   // const foo = 1

//   return (
//     <strong>{foo}</strong>
//   )
// }

const Emulator = () => {
  const { romBufferMemory } = useContext(ROMContext)

  return (
    // <strong>foo</strong>
    <GBAEmulator romBufferMemory={romBufferMemory} />
  )
}

export default Emulator
