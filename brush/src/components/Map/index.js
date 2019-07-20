import React, { useContext, Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Stage } from '@inlet/react-pixi'
import MapFooter from '../MapFooter'
import HighlightCoordinates from './HighlightCoordinates'
import VisionContext from '../../context/VisionContext'
import TilemapLayer from './TilemapLayer'
import DrawingLayer from './DrawingLayer'
import OAMLayer from './OAMLayer'
import PortalsLayer from './PortalsLayer'
import GridLayer from './GridLayer'
import useWhenVisionChanges from '../../hooks/useWhenVisionChanges'

const Map = ({
  highlightCoordinates,
  optShowGrid,
  optShowOAM,
  optShowPortals,
  toolState,
}) => {
  const { updateTilemapPoint, vision } = useContext(VisionContext)
  const {
    infos: {
      tilemap: {
        height,
        totalStages,
        width,
      },
    },
  } = vision

  const [selectedPointInfos, setSelectedPointInfos] = useState(null)

  useWhenVisionChanges(() => {
    setSelectedPointInfos(null)
  })

  return (
    <Fragment>
      <Stage
        width={width * 4}
        height={height * 4}
        options={{
          antialias: true,
          transparent: true,
        }}
      >
        <TilemapLayer
          setSelectedPointInfos={setSelectedPointInfos}
          vision={vision}
        />
        <DrawingLayer
          height={height * 4}
          toolState={toolState}
          updateTilemapPoint={updateTilemapPoint}
          width={width * 4}
        />
        {optShowOAM && <OAMLayer
          setSelectedPointInfos={setSelectedPointInfos}
          totalStages={totalStages}
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
      <MapFooter informations={selectedPointInfos} />
    </Fragment>
  )
}

Map.propTypes = {
  highlightCoordinates: PropTypes.arrayOf(PropTypes.number),
  optShowGrid: PropTypes.bool,
  optShowOAM: PropTypes.bool,
  optShowPortals: PropTypes.bool,
  toolState: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
  }).isRequired,
}

Map.defaultProps = {
  highlightCoordinates: [-1, -1],
  optShowGrid: false,
  optShowOAM: true,
  optShowPortals: true,
}

export default Map
