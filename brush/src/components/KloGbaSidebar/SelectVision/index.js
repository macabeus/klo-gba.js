import React, { useContext } from 'react'
import { SidebarLink } from 'former-kit'
import { allVisions } from 'scissors'
import VisionContext from '../../../context/VisionContext'
import ROMContext from '../../../context/ROMContext'

const SelectVision = () => {
  const { romBufferMemory } = useContext(ROMContext)
  const {
    updateVision,
    vision,
    visionIndex,
    visionWorld,
  } = useContext(VisionContext)

  const setNewVision = (newVision) => {
    const [newVisionWorld, newVisionIndex] = newVision.split('-')

    updateVision(romBufferMemory, newVisionWorld, newVisionIndex)
  }

  const visionsLinks = allVisions.map(info => (
    <SidebarLink
      title={`${info.location.worldName} - ${info.location.index}`}
      onClick={() => setNewVision(`${info.location.world}-${info.location.index}`)}
      active={
        vision.state === 'selected'
        && visionWorld === `${info.location.world}`
        && visionIndex === `${info.location.index}`
      }
      key={`${info.location.world}-${info.location.index}`}
    />
  ))

  return (
    <SidebarLink
      title="Select a vision"
      beginExpanded
    >
      {visionsLinks}
    </SidebarLink>
  )
}

export default SelectVision
