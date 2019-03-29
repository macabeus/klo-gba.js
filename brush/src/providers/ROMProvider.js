import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import localforage from 'localforage'
import ROMContext from '../context/ROMContext'

const useROMBuffer = () => {
  const romBufferStates = {
    empty: { memory: null, status: 'empty' },
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
  }, [])

  const updateROMBufferState = (newRomBufferMemory) => {
    setROMBufferState(romBufferStates.loaded(newRomBufferMemory))
    localforage.setItem('romBuffer', newRomBufferMemory)
  }

  return [romBufferState, updateROMBufferState]
}

const ROMProvider = (props) => {
  const [romBuffer, setROMBuffer] = useROMBuffer()

  return (
    <ROMContext.Provider
      value={{
        romBufferMemory: romBuffer.memory,
        romBufferStatus: romBuffer.status,
        setROMBuffer,
      }}
    >
      {props.children}
    </ROMContext.Provider>
  )
}

ROMProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ROMProvider
