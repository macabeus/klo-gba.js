import React, { useContext, useState, Fragment } from 'react'
import {
  Button,
  Card,
  CardContent,
  CardTitle,
  Flexbox,
  Popover,
  Spacing,
} from 'former-kit'
import ObjectsTable from './ObjectsTable'
import ROMContext from '../context/ROMContext'
import Map from './map'
import InputROMModal from './InputROMModal'
import useWhenVisionChanges from '../hooks/useWhenVisionChanges'

const Body = () => {
  const { romBufferStatus } = useContext(ROMContext)
  const [highlightCoordinates, setHighlightCoordinates] = useState([-1, -1])

  useWhenVisionChanges(() => {
    setHighlightCoordinates([-1, -1])
  })

  const contentStates = {
    empty: <InputROMModal />,
    loaded: (
      <Fragment>
        <Card>
          <CardContent>
            <Flexbox justifyContent="flex-end">
              <Popover content={<Fragment />}>
                <Button>Display map options</Button>
              </Popover>
            </Flexbox>

            <Spacing />

            <Map highlightCoordinates={highlightCoordinates} />
          </CardContent>
        </Card>

        <Spacing />

        <Card>
          <CardTitle title="Objects Table" />
          <CardContent>
            <ObjectsTable onRowClickHandler={setHighlightCoordinates} />
          </CardContent>
        </Card>
      </Fragment>
    ),
    starting: null,
  }

  return contentStates[romBufferStatus]
}

export default Body
