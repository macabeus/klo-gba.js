import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import reset from '../emulator/reset'
import emulatorSetVolume from '../emulator/setVolume'
import GbaContext from './gba-context'

const ReactGbaJs = ({ volume }) => {
  const { gba } = useContext(GbaContext)

  useEffect(() => {
    if (gba === undefined) {
      return
    }

    emulatorSetVolume(gba, volume)
  }, [gba, volume])

  return (
    <canvas id="screen" width="480" height="320" />
  )
}

ReactGbaJs.propTypes = {
  volume: PropTypes.number.isRequired,
}

export default ReactGbaJs
