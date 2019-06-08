import React, { useContext } from 'react'
import { Dropdown } from 'former-kit'
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

  return (
    <Dropdown
      name="selectVision"
      placeholder="Select a vision"
      onChange={e => setNewVision(e.target.value)}
      value={dropdownValue}
      options={[{ name: 'Vision 1-1', value: '1-1' }, { name: 'Vision 1-2', value: '1-2' }]}
    />
  )
}

export default SelectVision
