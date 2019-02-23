import React, { useContext } from 'react'
import { Dropdown } from 'former-kit'
import VisionContext from '../context/VisionContext'

const SelectVision = () => {
  const { visionIndex, visionUpdate, visionWorld } = useContext(VisionContext)

  const setNewVision = (newVision) => {
    const [newVisionWorld, newVisionIndex] = newVision.split('-')

    visionUpdate(newVisionWorld, newVisionIndex)
  }

  return (
    <Dropdown
      name="selectVision"
      onChange={e => setNewVision(e.target.value)}
      value={`${visionWorld}-${visionIndex}`}
      options={[{ name: 'Vision 1-1', value: '1-1' }, { name: 'Vision 1-2', value: '1-2' }]}
    />
  )
}

export default SelectVision
