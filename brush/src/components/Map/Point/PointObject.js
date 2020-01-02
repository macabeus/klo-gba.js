import React from 'react'
import PropTypes from 'prop-types'
import { defaultTo } from 'ramda'
import { objectIdToName } from 'scissors'
import Point from '.'

const objectIdToColor = {
  0x01: [0xBC1616, 1],
  0x02: [0x1616BC, 1],
  0x03: [0xFFE80D, 1],
  0x05: [0x737373, 1],
  0x07: [0xFF6ED2, 1],
  0x2C: [0xB3FF62, 1],
  0x2D: [0x8CFFFA, 1],
  0x2E: [0xBCC9CF, 1],
  0x6F: [0xCD5851, 1],
  0x76: [0x438F36, 1],
  0x77: [0x21722B, 1],
  0x78: [0x21722B, 1],
}

const PointObject = ({
  objectId,
  objectIndex,
  onClickHandle,
  onFinishDragAndDrop,
  showPointInfosHandle,
  stage,
  x,
  y,
}) => {
  const name = defaultTo('unknown', objectIdToName[objectId])
  const color = defaultTo([0x000000, 1], objectIdToColor[objectId])

  const hexObjectId = `0x${objectId.toString(16).toUpperCase()}`
  const informations = {
    message: `Object ${name} (${hexObjectId}) from stage ${stage}`,
    x,
    y,
  }

  const saveNewObjectPosition = (newX, newY) => {
    onFinishDragAndDrop(objectIndex, `xStage${stage}`, newX)
    onFinishDragAndDrop(objectIndex, `yStage${stage}`, newY)
  }

  const onClick = () => onClickHandle(objectIndex)

  return (<Point
    color={color}
    draggable
    hasStroke
    onClickHandle={onClick}
    onHoverHandle={() => showPointInfosHandle(informations)}
    onFinishDragAndDropHandle={saveNewObjectPosition}
    scale={8}
    x={x}
    y={y}
  />)
}

PointObject.propTypes = {
  objectId: PropTypes.number.isRequired,
  objectIndex: PropTypes.number.isRequired,
  onClickHandle: PropTypes.func,
  onFinishDragAndDrop: PropTypes.func,
  showPointInfosHandle: PropTypes.func,
  stage: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

PointObject.defaultProps = {
  onClickHandle: () => {},
  onFinishDragAndDrop: () => {},
  showPointInfosHandle: () => {},
}

export default PointObject
