import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import localforage from 'localforage'
import ROMContext from '../context/ROMContext'

const useROMBuffer = () => {
  const romBufferStates = {
    empty: { memory: null, status: 'empty' },
    holding: memory => ({ memory, status: 'holding' }),
    loaded: memory => ({ memory, status: 'loaded' }),
    starting: { memory: null, status: 'starting' },
  }

  const [romBufferState, setROMBufferState] = useState(romBufferStates.starting)

  useEffect(() => {
    const fetchLocalROMBufferMemory = async () => {
      const romBufferMemory = await localforage.getItem('romBuffer')

      if (romBufferMemory) {
        setROMBufferState(romBufferStates.loaded(romBufferMemory))
      } else {
        setROMBufferState(romBufferStates.empty)
      }
    }

    fetchLocalROMBufferMemory()
  }, []) /* it should run only once */ // eslint-disable-line react-hooks/exhaustive-deps

  const putOnHoldROMBufferState = () =>
    setROMBufferState(romBufferStates.holding(romBufferState.memory))

  const cancelOnHoldROMBufferState = () =>
    setROMBufferState(romBufferStates.loaded(romBufferState.memory))

  const updateROMBufferState = (newRomBufferMemory) => {
    setROMBufferState(romBufferStates.loaded(newRomBufferMemory))
    localforage.setItem('romBuffer', newRomBufferMemory)
  }

  return [
    romBufferState,
    updateROMBufferState,
    putOnHoldROMBufferState,
    cancelOnHoldROMBufferState,
  ]
}

const ROMProvider = ({ children }) => {
  const [
    romBuffer,
    setROMBuffer,
    putOnHoldROMBufferState,
    cancelOnHoldROMBufferState,
  ] = useROMBuffer()

  return (
    <ROMContext.Provider
      value={{
        cancelOnHoldROMBufferState,
        putOnHoldROMBufferState,
        romBufferMemory: romBuffer.memory,
        romBufferStatus: romBuffer.status,
        setROMBuffer,
      }}
    >
      {children}
    </ROMContext.Provider>
  )
}

ROMProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ROMProvider
