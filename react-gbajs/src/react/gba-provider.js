import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cloneDeep from 'lodash.clonedeep'
import drawEmulator from '../emulator'
import GbaContext from './gba-context'

const GbaProvider = ({ children }) => {
  const [gba, setGba] = useState()
  const [volume, setVolume] = useState(null)
  const [romBufferMemory, setRomBufferMemory] = useState()
  const [frozenAddresses, setFrozenAddresses] = useState({})

  const play = (newRomBufferMemory) => {
    setRomBufferMemory(newRomBufferMemory)

    const newGbaInstance = drawEmulator(newRomBufferMemory)
    setGba(newGbaInstance)
  }

  const saveState = () =>
    gba.freeze()

  const restoreState = (savedState) => {
    gba.setRom(romBufferMemory.buffer)
    gba.defrost(cloneDeep(savedState))
    gba.runStable()
  }

  const updateFrozenAddreses = () =>
    setFrozenAddresses(cloneDeep(gba.frozenAddresses))

  return (
    <GbaContext.Provider value={{
      gba,
      setRomBufferMemory,
      play,
      saveState,
      restoreState,
      frozenAddresses,
      addFreezeAddress: gba && ((args) => {
        gba.addFreezeAddress(args)
        updateFrozenAddreses()
      }),
      removeFreezeAddress: gba && ((args) => {
        gba.removeFreezeAddress(args)
        updateFrozenAddreses()
      }),
    }}
    >
      {children}
    </GbaContext.Provider>
  )
}

GbaProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default GbaProvider
