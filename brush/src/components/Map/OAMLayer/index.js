import React from 'react'
import PropTypes from 'prop-types'
import { Layer } from 'react-konva'
import { range } from 'ramda'
import PointOam from '../Point/PointOam'

const OAMLayer = ({ setSelectedPointInfos, totalStages, vision }) => {
  const { oam } = vision

  const oamList = oam
    .map(oamEntry => oamEntry.data)
    .map(oamData =>
      range(1, totalStages + 1).map((i) => {
        const x = oamData[`xStage${i}`]
        const y = oamData[`yStage${i}`]

        return (
          <PointOam
            key={`${x} ${y} ${i}`}
            oamId={oamData.kind}
            stage={i}
            showPointInfosHandle={setSelectedPointInfos}
            x={x}
            y={y}
          />
        )
      }))

  return (
    <Layer>
      {oamList}
    </Layer>
  )
}

OAMLayer.propTypes = {
  setSelectedPointInfos: PropTypes.func,
  totalStages: PropTypes.number.isRequired,
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
