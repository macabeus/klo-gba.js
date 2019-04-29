import React, { useContext, useState, Fragment } from 'react'
import {
  Button,
  Card,
  CardContent,
  CardTitle,
  Checkbox,
  Flexbox,
  Popover,
  PopoverContent,
  Spacing,
} from 'former-kit'
import ObjectsTable from './ObjectsTable'
import ROMContext from '../context/ROMContext'
import VisionContext from '../context/VisionContext'
import Map from './map'
import MapEmptyState from './MapEmptyState'
import InputROMModal from './InputROMModal'
import SaveButton from './MapActionsBar/SaveButton'
import TileSet from './TileSet'
import useWhenVisionChanges from '../hooks/useWhenVisionChanges'

const Body = () => {
  const { vision } = useContext(VisionContext)
  const { romBufferStatus } = useContext(ROMContext)
  const [highlightCoordinates, setHighlightCoordinates] = useState([-1, -1])
  const [showGrid, setShowGrid] = useState(false)
  const [showOAM, setShowOAM] = useState(true)
  const [selectedTileIdInSet, setSelectedTileIdInSet] = useState(null)

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
              <SaveButton />
              <Spacing size="tiny" />
              <Popover
                content={
                  <PopoverContent>
                    <Fragment>
                      <Checkbox
                        label="Show grid"
                        name="showGrid"
                        value={`${showGrid}`}
                        checked={showGrid}
                        onChange={() => { setShowGrid(!showGrid) }}
                      />
                      <Checkbox
                        label="Show OAM"
                        name="showOAM"
                        value={`${showOAM}`}
                        checked={showOAM}
                        onChange={() => { setShowOAM(!showOAM) }}
                      />
                    </Fragment>
                  </PopoverContent>
                }
              >
                <Button>Display map options</Button>
              </Popover>
            </Flexbox>

            <Spacing />

            {
              (vision.state === 'selected') ?
                <Map
                  highlightCoordinates={highlightCoordinates}
                  selectedTileIdInSet={selectedTileIdInSet}
                  showGrid={showGrid}
                  showOAM={showOAM}
                /> :
                <MapEmptyState />
            }
          </CardContent>
        </Card>

        <Spacing />

        <Card>
          <CardTitle title="Tile Set" />
          <CardContent>
            <TileSet onSelectTile={setSelectedTileIdInSet} />
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
