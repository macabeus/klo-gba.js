import React, { useContext, useState } from 'react'
import {
  Card,
  CardContent,
  CardTitle,
  Flexbox,
  Spacing,
} from 'former-kit'
import ClearHighlightCoordinates from '../../components/ClearHighlightCoordinates'
import Emualtor from '../../components/Emulator'
import ObjectDetail from '../../components/ObjectDetail'
import ObjectsTable from '../../components/ObjectsTable'
import DisplayMapOptionsContext from '../../context/DisplayMapOptionsContext'
import VisionContext from '../../context/VisionContext'
import Map from '../../components/Map'
import MapEmptyState from '../../components/MapEmptyState'
import SaveButton from '../../components/MapActionsBar/SaveButton'
import SwitchTool from '../../components/MapActionsBar/SwitchTool'
import EmulatorUpdateVision from '../../components/EmulatorUpdateVision'
import TileSet from '../../components/TileSet'
import useTool from '../../hooks/useTool'
import useWhenVisionChanges from '../../hooks/useWhenVisionChanges'
import style from './style.css'

const LoadedRom = () => {
  const { options } = useContext(DisplayMapOptionsContext)
  const { vision } = useContext(VisionContext)
  const [selectedObject, setSelectedObject] = useState(null)
  const [highlightCoordinates, setHighlightCoordinates] = useState([-1, -1])
  const [toolState, setToolState] = useTool()

  useWhenVisionChanges(() => {
    setHighlightCoordinates([-1, -1])
    setSelectedObject(null)
  })

  return (
    <>
      <Flexbox className={style.containerFirstRow}>
        <Card>
          <CardContent className={style.cardTilemap}>
            <Flexbox alignItems="center" justifyContent="flex-end">
              <SwitchTool
                setToolState={setToolState}
                toolState={toolState}
              />
              {
                highlightCoordinates[0] !== -1
                && <ClearHighlightCoordinates
                  setHighlightCoordinates={setHighlightCoordinates}
                />
              }
              <Spacing />
              <Spacing size="tiny" />
              <SaveButton />
            </Flexbox>

            {
              (vision.state === 'selected') ?
                <Map
                  highlightCoordinates={highlightCoordinates}
                  optShowGrid={options.showGrid}
                  optShowObjects={options.showObjects}
                  optShowPortals={options.showPortals}
                  setSelectedObject={setSelectedObject}
                  setToolState={setToolState}
                  toolState={toolState}
                  resolution={options.zoom}
                /> :
                <MapEmptyState />
            }
          </CardContent>
        </Card>

        <Card className={style.cardEmulator}>
          <CardContent>
            <Flexbox alignItems="center" justifyContent="flex-end">
              <EmulatorUpdateVision />
            </Flexbox>

            <Emualtor />
          </CardContent>
        </Card>
      </Flexbox>

      <Spacing />

      <Flexbox className={style.containerSecondRow}>
        <Card>
          <CardTitle title="Tile Set" />
          <CardContent>
            <TileSet setToolState={setToolState} />
          </CardContent>
        </Card>

        <Card className={style.cardObjectsDetail}>
          <CardTitle title="Object Detail" />
          <CardContent>
            <ObjectDetail
              objectIndex={selectedObject}
              setHighlightCoordinates={setHighlightCoordinates}
            />
          </CardContent>
        </Card>
      </Flexbox>

      <Spacing />

      <Card>
        <CardTitle title="Objects Table" />
        <CardContent>
          <ObjectsTable onRowClickHandler={setHighlightCoordinates} />
        </CardContent>
      </Card>
    </>
  )
}

export default LoadedRom
