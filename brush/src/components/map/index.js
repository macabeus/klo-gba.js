import React, { useContext, Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Stage, Layer } from 'react-konva'
import MapFooter from '../MapFooter'
import HighlightCoordinates from './HighlightCoordinates'
import VisionContext from '../../context/VisionContext'
import TilemapLayer from './TilemapLayer'
import OAMLayer from './OAMLayer'
import GridLayer from './GridLayer'
import useWhenVisionChanges from '../../hooks/useWhenVisionChanges'

const Map = ({ highlightCoordinates, showGrid }) => {
  const { vision } = useContext(VisionContext) // workaround because a limitation in react-konva (https://github.com/konvajs/react-konva/issues/349)
  const {
    infos: {
      tilemap: {
        height,
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
      <Stage width={width * 4} height={height * 4}>
        <TilemapLayer
          setSelectedPointInfos={setSelectedPointInfos}
          vision={vision}
        />
        <OAMLayer
          setSelectedPointInfos={setSelectedPointInfos}
          vision={vision}
        />
        <Layer>
          <HighlightCoordinates
            coordinates={highlightCoordinates}
            height={height}
            width={width}
          />
        </Layer>
        {showGrid && <GridLayer
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
  showGrid: PropTypes.bool,
}

Map.defaultProps = {
  highlightCoordinates: [-1, -1],
  showGrid: false,
}

export default Map
