import React, { useContext } from 'react'
import { Dropdown } from 'former-kit'
import { allVisions } from 'scissors'
import VisionContext from '../../context/VisionContext'
import ROMContext from '../../context/ROMContext'

const SelectVision = () => {
  const { romBufferMemory } = useContext(ROMContext)
  const {
    updateVision,
    vision: { state: visionState },
    visionIndex,
    visionWorld,
  } = useContext(VisionContext)

  const setNewVision = (newVision) => {
    const [newVisionWorld, newVisionIndex] = newVision.split('-')

    updateVision(romBufferMemory, newVisionWorld, newVisionIndex)
  }

  const dropdownValue = visionState === 'noSelected' ?
    '' :
    `${visionWorld}-${visionIndex}`

  const dropdownOptions = allVisions.map(info => ({
    name: `${info.location.worldName} - ${info.location.index}`,
    value: `${info.location.world}-${info.location.index}`,
  }))

  return (
    <Dropdown
      name="selectVision"
      placeholder="Select a vision"
      onChange={e => setNewVision(e.target.value)}
      value={dropdownValue}
      options={dropdownOptions}
    />
  )
}

export default SelectVision
