import React, { useContext } from 'react'
import { SidebarLink } from 'former-kit'
import ROMContext from '../../../context/ROMContext'
import VisionContext from '../../../context/VisionContext'

const ChangeRom = () => {
  const { setROMBuffer } = useContext(ROMContext)
  const { setEmptyState } = useContext(VisionContext)

  return (
    <SidebarLink
      title="Change ROM"
      onClick={() => {
        setROMBuffer(null)
        setEmptyState()
      }}
    />
  )
}

export default ChangeRom
