import React, {
  useContext,
  useState,
  useRef,
} from 'react'
import PropTypes from 'prop-types'
import * as PIXI from 'pixi.js'
import { Stage } from '@inlet/react-pixi'
import MapFooter from '../MapFooter'
import HighlightCoordinates from './HighlightCoordinates'
import VisionContext from '../../context/VisionContext'
import TilemapLayer from './TilemapLayer'
import DrawingLayer from './DrawingLayer'
import ObjectsLayer from './ObjectsLayer'
import PortalsLayer from './PortalsLayer'
import GridLayer from './GridLayer'
import useWhenVisionChanges from '../../hooks/useWhenVisionChanges'
import style from './style.css'

const Map = ({
  highlightCoordinates,
  optShowGrid,
  optShowObjects,
  optShowPortals,
  resolution,
  setSelectedObject,
  setToolState,
  toolState,
}) => {
  const {
    getTilemapPoint,
    updateObjectsDiffMap,
    updateTilemapPoint,
    vision,
  } = useContext(VisionContext)
  const {
    infos: {
      tilemap: {
        scheme,
        totalStages,
      },
    },
    tilemapSize: {
      height,
      width,
    },
  } = vision

  const [selectedPointInfos, setSelectedPointInfos] = useState(null)
  const [pixiApplication, setPixiApplication] = useState(null)
  const tilemapLayerRef = useRef(null)

  useWhenVisionChanges(() => {
    setSelectedPointInfos(null)
  })

  if (
    pixiApplication !== null
    && pixiApplication.renderer.resolution !== resolution
  ) {
    PIXI.settings.RESOLUTION = resolution
    pixiApplication.renderer.resolution = resolution

    pixiApplication.renderer.plugins.interaction.destroy()
    pixiApplication.renderer.plugins.interaction =
      new PIXI.interaction.InteractionManager(pixiApplication.renderer)

    pixiApplication.render()
  }

  return (
    <>
      <div className={style.webglWrapper}>
        <Stage
          width={(width * 4) + resolution} //   workaround because, for some unknown reason, we need to update the size of the stage when we change its resolution
          height={(height * 4) + resolution} // https://github.com/inlet/react-pixi/issues/127
          options={{
            antialias: true,
            resolution,
            transparent: true,
          }}
          onMount={setPixiApplication}
        >
          <TilemapLayer
            vision={vision}
            ref={tilemapLayerRef}
          />
          <DrawingLayer
            getTilemapPoint={getTilemapPoint}
            height={height * 4}
            scheme={scheme}
            setSelectedPointInfos={setSelectedPointInfos}
            setToolState={setToolState}
            toolState={toolState}
            updateTilemapLayer={() => tilemapLayerRef.current.forceUpdate()}
            updateTilemapPoint={updateTilemapPoint}
            width={width * 4}
          />
          {optShowObjects && <ObjectsLayer
            updateObjectsDiffMap={updateObjectsDiffMap}
            setSelectedPointInfos={setSelectedPointInfos}
            totalStages={totalStages}
            setSelectedObject={setSelectedObject}
            vision={vision}
          />}
          {optShowPortals && <PortalsLayer vision={vision} />}
          <HighlightCoordinates
            coordinates={highlightCoordinates}
            height={height}
            width={width}
          />
          {optShowGrid && <GridLayer
            height={height * 4}
            width={width * 4}
          />}
        </Stage>
      </div>
      <MapFooter informations={selectedPointInfos} />
    </>
  )
}

Map.propTypes = {
  highlightCoordinates: PropTypes.arrayOf(PropTypes.number),
  optShowGrid: PropTypes.bool,
  optShowObjects: PropTypes.bool,
  optShowPortals: PropTypes.bool,
  resolution: PropTypes.number,
  setSelectedObject: PropTypes.func,
  setToolState: PropTypes.func,
  toolState: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
  }).isRequired,
}

Map.defaultProps = {
  highlightCoordinates: [-1, -1],
  optShowGrid: false,
  optShowObjects: true,
  optShowPortals: true,
  resolution: 1,
  setSelectedObject: () => {},
  setToolState: () => {},
}

export default Map
