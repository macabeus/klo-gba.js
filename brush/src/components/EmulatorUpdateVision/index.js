import React, { useCallback, useContext, useEffect } from 'react'
import { Button } from 'former-kit'
import { saveVision } from 'scissors'
import ROMContext from '../../context/ROMContext'
import VisionContext from '../../context/VisionContext'

const keyCodeU = 85

const EmulatorUpdateVision = () => {
  const { romBufferMemory, setMemoryROMBufferState } = useContext(ROMContext)
  const {
    gbaEnterVision,
    vision: {
      objectsDiffMap,
      state,
      tilemap,
    },
    visionIndex,
    visionWorld,
  } = useContext(VisionContext)

  const updateVisionHandle = useCallback(
    () => {
      const newRomBuffer = saveVision(
        romBufferMemory,
        visionWorld,
        visionIndex,
        tilemap,
        objectsDiffMap
      )

      setMemoryROMBufferState(newRomBuffer)

      gbaEnterVision(visionWorld, visionIndex, newRomBuffer)
    },
    [
      romBufferMemory,
      gbaEnterVision,
      visionWorld,
      visionIndex,
      tilemap,
      objectsDiffMap,
      setMemoryROMBufferState,
    ]
  )

  useEffect(() => {
    const keyPressHandle = ({ keyCode }) => {
      if (keyCode === keyCodeU && state === 'selected') {
        updateVisionHandle()
      }
    }

    window.addEventListener('keydown', keyPressHandle)
    window.addEventListener('keyup', keyPressHandle)

    return () => {
      window.removeEventListener('keydown', keyPressHandle)
      window.removeEventListener('keyup', keyPressHandle)
    }
  }, [updateVisionHandle, state])

  return (
    <Button
      onClick={updateVisionHandle}
      disabled={state === 'noSelected'}
    >
      Update vision
    </Button>
  )
}

export default EmulatorUpdateVision
