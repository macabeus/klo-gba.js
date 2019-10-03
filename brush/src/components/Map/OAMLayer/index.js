import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { range } from 'ramda'
import PointOam from '../Point/PointOam'

const OAMLayer = ({
  setSelectedPointInfos,
  totalStages,
  updateOAMDiffMap,
  vision,
}) => {
  const { oam } = vision

  const oamList = oam
    .map(oamEntry => oamEntry.data)
    .map((oamData, oamIndex) =>
      range(1, totalStages + 1).map((i) => {
        const x = oamData[`xStage${i}`]
        const y = oamData[`yStage${i}`]

        return (
          <PointOam
            onFinishDragAndDrop={updateOAMDiffMap}
            key={`${x} ${y} ${i}`}
            oamId={oamData.kind}
            oamIndex={oamIndex}
            stage={i}
            showPointInfosHandle={setSelectedPointInfos}
            x={x}
            y={y}
          />
        )
      }))

  return (
    <Fragment>
      {oamList}
    </Fragment>
  )
}

OAMLayer.propTypes = {
  setSelectedPointInfos: PropTypes.func,
  totalStages: PropTypes.number.isRequired,
  updateOAMDiffMap: PropTypes.func,
  vision: PropTypes.shape({
    oam: PropTypes.arrayOf(PropTypes.shape({
      data: PropTypes.object.isRequired,
      memory: PropTypes.object.isRequired,
    })).isRequired,
  }).isRequired,
}

OAMLayer.defaultProps = {
  setSelectedPointInfos: () => {},
  updateOAMDiffMap: () => {},
}

export default OAMLayer
