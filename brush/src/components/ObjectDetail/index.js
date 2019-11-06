import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Flexbox } from 'former-kit'
import { range } from 'ramda'
import VisionContext from '../../context/VisionContext'
import Kind from './Kind'
import style from './style.css'

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
    <Flexbox className={style.container}>
      <Kind
        objectIndex={objectIndex}
        objectKind={objectData.kind}
      />

      {
        range(1, totalStages + 1).map(i => (
          <p key={i}>
            <strong>Coordenates Stage {i}:</strong> {getFinalData(`xStage${i}`)} {getFinalData(`yStage${i}`)}
          </p>
        ))
      }
    </Flexbox>
  )
}

ObjectDetail.propTypes = {
  objectIndex: PropTypes.number,
}

ObjectDetail.defaultProps = {
  objectIndex: null,
}

export default ObjectDetail
