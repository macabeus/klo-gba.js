import React, { useContext, useState, Fragment } from 'react'
import {
  Card,
  CardContent,
  CardTitle,
  Flexbox,
  Spacing,
} from 'former-kit'
import ObjectsTable from '../../components/ObjectsTable'
import DisplayMapOptionsContext from '../../context/DisplayMapOptionsContext'
import VisionContext from '../../context/VisionContext'
import Map from '../../components/Map'
import MapEmptyState from '../../components/MapEmptyState'
import SaveButton from '../../components/MapActionsBar/SaveButton'
import SwitchTool from '../../components/MapActionsBar/SwitchTool'
import TileSet from '../../components/TileSet'
import ZoomSelector from '../../components/ZoomSelector'
import useTool from '../../hooks/useTool'
import useWhenVisionChanges from '../../hooks/useWhenVisionChanges'
import style from './style.css'

const LoadedRom = () => {
  const { options } = useContext(DisplayMapOptionsContext)
  const { vision } = useContext(VisionContext)
  const [highlightCoordinates, setHighlightCoordinates] = useState([-1, -1])
  const [toolState, setToolState] = useTool()
  const [resolution, setResolution] = useState(1)

  useWhenVisionChanges(() => {
    setHighlightCoordinates([-1, -1])
  })

  return (
    <Fragment>
      <Card>
        <CardContent className={style.cardTilemap}>
          <Flexbox justifyContent="flex-end">
            <SwitchTool
              setToolState={setToolState}
              toolState={toolState}
            />
            <Spacing />
            <ZoomSelector
              onSelectorChange={setResolution}
            />
            <Spacing size="tiny" />
            <SaveButton />
          </Flexbox>

          {
            (vision.state === 'selected') ?
              <Map
                highlightCoordinates={highlightCoordinates}
                optShowGrid={options.showGrid}
                optShowOAM={options.showOAM}
                optShowPortals={options.showPortals}
                toolState={toolState}
                resolution={resolution}
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
