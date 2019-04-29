import React, { useContext } from 'react'
import { Button } from 'former-kit'
import { saveVision } from 'scissors'
import ROMContext from '../../context/ROMContext'
import VisionContext from '../../context/VisionContext'

const romDownload = (romBufferMemory, world, index, tilemap) => {
  const newMemoryROM = saveVision(romBufferMemory, world, index, tilemap)

  const blob = new Blob([newMemoryROM])

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', 'klo-gba.rom')
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  const event = document.createEvent('MouseEvents')
  event.initEvent('click', true, true)
  link.dispatchEvent(event)
}

const SaveButton = () => {
  const { romBufferMemory } = useContext(ROMContext)
  const {
    vision: {
      tilemap,
    },
    visionIndex,
    visionWorld,
  } = useContext(VisionContext)

  return (
    <Button
      onClick={() => {
        romDownload(romBufferMemory, visionWorld, visionIndex, tilemap)
      }}
    >
      Save map
    </Button>
  )
}

export default SaveButton
