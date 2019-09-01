import React, { useContext } from 'react'
import { Button } from 'former-kit'
import ROMContext from '../../context/ROMContext'
import VisionContext from '../../context/VisionContext'

const ChangeRom = () => {
  const { setROMBuffer } = useContext(ROMContext)
  const { setEmptyState } = useContext(VisionContext)

  return (
    <Button
      onClick={() => {
        setROMBuffer(null)
        setEmptyState()
      }}
    >
      Change ROM
    </Button>
  )
}

export default ChangeRom
