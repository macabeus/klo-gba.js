import React from 'react'
import PropTypes from 'prop-types'
import { SegmentedSwitch } from 'former-kit'

const SwitchTool = ({ setToolState, toolState }) => (
  <SegmentedSwitch
    name="tool"
    onChange={(value) => { setToolState(value) }}
    options={[
      {
        title: 'Magnifying Glass',
        value: 'magnifyingGlass',
      },
      {
        title: 'Brush',
        value: 'brush',
      },
    ]}
    value={toolState.name}
  />
)

SwitchTool.propTypes = {
  setToolState: PropTypes.func.isRequired,
  toolState: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
}

export default SwitchTool
