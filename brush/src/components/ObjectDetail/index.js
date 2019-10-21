import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { range } from 'ramda'
import { objectIdToName } from 'scissors'
import VisionContext from '../../context/VisionContext'

const ObjectDetail = ({ objectIndex }) => {
  const {
    infos: {
      tilemap: {
        totalStages,
      },
    },
    objects,
    objectsDiffMap,
  } = useContext(VisionContext).vision

  if (objectIndex === null) {
    return <p>no object selected</p>
  }

  const objectData = objects[objectIndex].data
  const objectCustomizedData = objectsDiffMap[objectIndex] || {}

  const getFinalData = name => objectCustomizedData[name] || objectData[name]

  return (
    <div>
      <p><strong>Kind:</strong> {objectIdToName[objectData.kind]}</p>
      {
        range(1, totalStages + 1).map(i => (
          <p key={i}>
            <strong>Coordenates Stage {i}:</strong> {getFinalData(`xStage${i}`)} {getFinalData(`yStage${i}`)}
          </p>
        ))
      }
    </div>
  )
}

ObjectDetail.propTypes = {
  objectIndex: PropTypes.number,
}

ObjectDetail.defaultProps = {
  objectIndex: null,
}

export default ObjectDetail
