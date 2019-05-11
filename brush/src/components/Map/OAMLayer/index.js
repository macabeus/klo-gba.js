import React from 'react'
import PropTypes from 'prop-types'
import { Layer } from 'react-konva'
import PointOam from '../Point/PointOam'

const OAMLayer = ({ setSelectedPointInfos, vision }) => {
  const { oam } = vision

  const oamList = oam
    .map(oamEntry => oamEntry.data)
    .map(({
      kind,
      xStage1,
      xStage2,
      xStage3,
      yStage1,
      yStage2,
      yStage3,
    }) =>
      [
        <PointOam
          key={`${xStage1} ${yStage1} 1`}
          oamId={kind}
          stage={1}
          showPointInfosHandle={setSelectedPointInfos}
          x={xStage1}
          y={yStage1}
        />,
        <PointOam
          key={`${xStage2} ${yStage2} 2`}
          oamId={kind}
          stage={2}
          showPointInfosHandle={setSelectedPointInfos}
          x={xStage2}
          y={yStage2}
        />,
        <PointOam
          key={`${xStage3} ${yStage3} 3`}
          oamId={kind}
          stage={3}
          showPointInfosHandle={setSelectedPointInfos}
          x={xStage3}
          y={yStage3}
        />,
      ])

  return (
    <Layer>
      {oamList}
    </Layer>
  )
}

OAMLayer.propTypes = {
  setSelectedPointInfos: PropTypes.func,
  vision: PropTypes.shape({
    oam: PropTypes.arrayOf(PropTypes.shape({
      data: PropTypes.object.isRequired,
      memory: PropTypes.object.isRequired,
    })).isRequired,
  }).isRequired,
}

OAMLayer.defaultProps = {
  setSelectedPointInfos: () => {},
}

export default OAMLayer
