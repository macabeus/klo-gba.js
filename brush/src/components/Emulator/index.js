import React, { useEffect, useContext } from 'react'
import GBAEmulator, { GbaContext } from 'react-gbajs'
import useGbaSaveRestoreState from '../../hooks/useGbaSaveRestoreState'
import ROMContext from '../../context/ROMContext'

const Emulator = () => {
  const { play: playGba } = useContext(GbaContext)
  const { romBufferMemory, romBufferStatus } = useContext(ROMContext)

  useEffect(() => {
    if (romBufferStatus === 'loaded') {
      playGba(romBufferMemory)
    }
  }, [romBufferStatus]) /* should not be called when romBufferState.memory updates */ // eslint-disable-line react-hooks/exhaustive-deps

  useGbaSaveRestoreState()

  return (
    <>
      <GBAEmulator volume={0} />
      <span>
        Controls:{' '}
        <strong>z</strong> → a;{' '}
        <strong>x</strong> → b;{' '}
        <strong>start</strong> → enter;{' '}
        <strong>q</strong> → save state;{' '}
        <strong>w</strong> → restore state
      </span>
    </>
  )
}

export default Emulator
