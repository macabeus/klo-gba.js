import React, { useContext } from 'react'
import { Button } from 'former-kit'
import { saveVision } from 'scissors'
import ROMContext from '../../context/ROMContext'
import VisionContext from '../../context/VisionContext'

const EmulatorUpdateVision = () => {
  const { romBufferMemory, setMemoryROMBufferState } = useContext(ROMContext)
  const {
    vision: {
      objectsDiffMap,
      state,
      tilemap,
    },
    visionIndex,
    visionWorld,
  } = useContext(VisionContext)

  return (
    <Button
      onClick={() =>
        saveVision(
          romBufferMemory,
          visionWorld,
          visionIndex,
          tilemap,
          objectsDiffMap
        )
        |> setMemoryROMBufferState
      }
      disabled={state === 'noSelected'}
    >
      Update vision
    </Button>
  )
}

export default EmulatorUpdateVision
