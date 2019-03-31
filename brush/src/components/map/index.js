import React, { useContext, Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Stage, Layer } from 'react-konva'
import MapFooter from '../MapFooter'
import HighlightCoordinates from './HighlightCoordinates'
import VisionContext from '../../context/VisionContext'
import TilemapLayer from './TilemapLayer'
import OAMLayer from './OAMLayer'
import useWhenVisionChanges from '../../hooks/useWhenVisionChanges'

const Map = ({ highlightCoordinates }) => {
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
      </Stage>
      <MapFooter informations={selectedPointInfos} />
    </Fragment>
  )
}

Map.propTypes = {
  highlightCoordinates: PropTypes.arrayOf(PropTypes.number),
}

Map.defaultProps = {
  highlightCoordinates: [-1, -1],
}

export default Map
