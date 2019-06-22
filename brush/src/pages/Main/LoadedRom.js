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
import ObjectsTable from '../../components/ObjectsTable'
import VisionContext from '../../context/VisionContext'
import Map from '../../components/Map'
import MapEmptyState from '../../components/MapEmptyState'
import SaveButton from '../../components/MapActionsBar/SaveButton'
import SwitchTool from '../../components/MapActionsBar/SwitchTool'
import TileSet from '../../components/TileSet'
import useTool from '../../hooks/useTool'
import useWhenVisionChanges from '../../hooks/useWhenVisionChanges'

const LoadedRom = () => {
  const { vision } = useContext(VisionContext)
  const [highlightCoordinates, setHighlightCoordinates] = useState([-1, -1])
  const [optShowGrid, setOptShowGrid] = useState(false)
  const [optShowOAM, setOptShowOAM] = useState(true)
  const [optShowPortals, setOptShowPortals] = useState(true)
  const [toolState, setToolState] = useTool()

  useWhenVisionChanges(() => {
    setHighlightCoordinates([-1, -1])
  })

  return (
    <Fragment>
      <Card>
        <CardContent>
          <Flexbox justifyContent="flex-end">
            <SwitchTool
              setToolState={setToolState}
              toolState={toolState}
            />
            <Spacing />
            <SaveButton />
            <Spacing size="tiny" />
            <Popover
              content={
                <PopoverContent>
                  <Fragment>
                    <Checkbox
                      label="Show grid"
                      name="optShowGrid"
                      value={`${optShowGrid}`}
                      checked={optShowGrid}
                      onChange={() => { setOptShowGrid(!optShowGrid) }}
                    />
                    <Checkbox
                      label="Show OAM"
                      name="optShowOAM"
                      value={`${optShowOAM}`}
                      checked={optShowOAM}
                      onChange={() => { setOptShowOAM(!optShowOAM) }}
                    />
                    <Checkbox
                      label="Show Portals"
                      name="optShowPortals"
                      value={`${optShowPortals}`}
                      checked={optShowPortals}
                      onChange={() => { setOptShowPortals(!optShowPortals) }}
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
                optShowGrid={optShowGrid}
                optShowOAM={optShowOAM}
                optShowPortals={optShowPortals}
                toolState={toolState}
              /> :
              <MapEmptyState />
          }
        </CardContent>
      </Card>

      <Spacing />

      <Card>
        <CardTitle title="Tile Set" />
        <CardContent>
          <TileSet setToolState={setToolState} />
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
  )
}

export default LoadedRom
