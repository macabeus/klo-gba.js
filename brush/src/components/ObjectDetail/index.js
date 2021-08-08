import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Flexbox } from 'former-kit'
import { range } from 'ramda'
import VisionContext from '../../context/VisionContext'
import Coordinates from './Coordinates'
import Kind from './Kind'
import style from './style.css'

const ObjectDetail = ({
  handleObjectChange,
  objectIndex,
  setHighlightCoordinates,
}) => {
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
        handleObjectChange={handleObjectChange}
        objectKind={objectData.kind}
      />

      {
        range(1, totalStages + 1).map(i => (
          <Coordinates
            key={i}
            setHighlightCoordinates={setHighlightCoordinates}
            stage={i}
            x={getFinalData(`xStage${i}`)}
            y={getFinalData(`yStage${i}`)}
          />
        ))
      }
    </Flexbox>
  )
}

ObjectDetail.propTypes = {
  handleObjectChange: PropTypes.func,
  objectIndex: PropTypes.number,
  setHighlightCoordinates: PropTypes.func,
}

ObjectDetail.defaultProps = {
  handleObjectChange: () => {},
  objectIndex: null,
  setHighlightCoordinates: () => {},
}

export default ObjectDetail
