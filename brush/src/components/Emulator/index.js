import React, { useEffect, useContext, useState } from 'react'
import GBAEmulator, { GbaContext } from 'react-gbajs'
import useGbaSaveRestoreState from '../../hooks/useGbaSaveRestoreState'
import ROMContext from '../../context/ROMContext'

const Emulator = () => {
  const [onError, setOnError] = useState(false)
  const { play: playGba } = useContext(GbaContext)
  const { romBufferMemory, romBufferStatus } = useContext(ROMContext)

  useEffect(() => {
    setOnError(false)

    if (romBufferStatus === 'loaded') {
      playGba({ newRomBuffer: romBufferMemory })
    }
  }, [romBufferStatus]) /* should not be called when romBufferState.memory updates */ // eslint-disable-line react-hooks/exhaustive-deps

  useGbaSaveRestoreState()

  const handleEmulatorCrashed = (...error) => {
    setOnError(true)

    // eslint-disable-next-line no-console
    console.warn(error)
  }

  if (onError) {
    return (
      <span>
        Emulator crashed. Please, open a new ROM or refresh this page.
      </span>
    )
  }

  return (
    <>
      <GBAEmulator
        scale={2}
        onLogReceived={handleEmulatorCrashed}
      />
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
