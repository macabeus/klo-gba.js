import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { range } from 'ramda'
import PointObject from '../Point/PointObject'

const ObjectsLayer = ({
  setSelectedObject,
  setSelectedPointInfos,
  totalStages,
  updateObjectsDiffMap,
  vision,
}) => {
  const { objects } = vision

  const objectsList = objects
    .map(objectEntry => objectEntry.data)
    .map((objectData, objectIndex) =>
      range(1, totalStages + 1).map((i) => {
        const x = objectData[`xStage${i}`]
        const y = objectData[`yStage${i}`]

        return (
          <PointObject
            onFinishDragAndDrop={updateObjectsDiffMap}
            key={`${x} ${y} ${i}`}
            objectId={objectData.kind}
            objectIndex={objectIndex}
            stage={i}
            onClickHandle={setSelectedObject}
            showPointInfosHandle={setSelectedPointInfos}
            x={x}
            y={y}
          />
        )
      }))

  return (
    <Fragment>
      {objectsList}
    </Fragment>
  )
}

ObjectsLayer.propTypes = {
  setSelectedObject: PropTypes.func,
  setSelectedPointInfos: PropTypes.func,
  totalStages: PropTypes.number.isRequired,
  updateObjectsDiffMap: PropTypes.func,
  vision: PropTypes.shape({
    objects: PropTypes.arrayOf(PropTypes.shape({
      data: PropTypes.object.isRequired,
      memory: PropTypes.object.isRequired,
    })).isRequired,
  }).isRequired,
}

ObjectsLayer.defaultProps = {
  setSelectedObject: () => {},
  setSelectedPointInfos: () => {},
  updateObjectsDiffMap: () => {},
}

export default ObjectsLayer
