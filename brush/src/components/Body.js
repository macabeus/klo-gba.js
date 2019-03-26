import React, { useContext, Fragment } from 'react'
import { Card, CardContent, CardTitle, Spacing } from 'former-kit'
import ObjectsTable from './ObjectsTable'
import ROMContext from '../context/ROMContext'
import Map from './map'
import InputROMModal from './InputROMModal'

const Body = () => {
  const { romBufferStatus } = useContext(ROMContext)

  const contentStates = {
    empty: <InputROMModal />,
    loaded: (
      <Fragment>
        <Card>
          <CardContent>
            <Map />
          </CardContent>
        </Card>

        <Spacing />

        <Card>
          <CardTitle title="Objects Table" />
          <CardContent>
            <ObjectsTable />
          </CardContent>
        </Card>
      </Fragment>
    ),
    starting: null,
  }

  return contentStates[romBufferStatus]
}

export default Body
