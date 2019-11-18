import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import sha1 from 'js-sha1'
import drawEmulator from '../emulator'
import reset from '../emulator/reset'
import setVolume from '../emulator/setVolume'

const ReactGbaJs = ({ romBufferMemory, volume }) => {
  const [gba, setGba] = useState(null)

  useEffect(() => {
    if (gba !== null) {
      reset(gba)
    }

    const newGbaInstance = drawEmulator(romBufferMemory)
    setGba(newGbaInstance)
  }, [sha1(romBufferMemory)])

  useEffect(() => {
    if (gba === null) {
      return
    }

    setVolume(gba, volume)
  }, [gba, volume])

  return (
    <canvas id="screen" width="480" height="320" />
  )
}

ReactGbaJs.propTypes = {
  romBufferMemory: PropTypes.object.isRequired,
  volume: PropTypes.number.isRequired,
}

export default ReactGbaJs
