import React, { useContext } from 'react'
import { Card, CardContent } from 'former-kit'
import ROMContext from '../context/ROMContext'
import Map from './map'
import InputROMModal from './InputROMModal'

const Body = () => {
  const { romBufferStatus } = useContext(ROMContext)

  const contentStates = {
    empty: <InputROMModal />,
    loaded: (
      <Card>
        <CardContent>
          <Map />
        </CardContent>
      </Card>
    ),
    starting: null,
  }

  return contentStates[romBufferStatus]
}

export default Body
