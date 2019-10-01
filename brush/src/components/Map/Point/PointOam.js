import React from 'react'
import PropTypes from 'prop-types'
import { defaultTo, pipe } from 'ramda'
import { oamIdToName } from 'scissors'
import Point from '.'

const oamIdToColor = {
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

const PointOam = ({
  oamId,
  showPointInfosHandle,
  stage,
  x,
  y,
}) => {
  const name = defaultTo('unknown', oamIdToName[oamId])
  const color = defaultTo([0x000000, 1], oamIdToColor[oamId])

  const getInformations = () => ({
    message: `OAM ${name} (${oamId}) from stage ${stage}`,
    x,
    y,
  })

  return (<Point
    color={color}
    draggable
    hasStroke
    onHoverHandle={pipe(getInformations, showPointInfosHandle)}
    scale={8}
    x={x}
    y={y}
  />)
}

PointOam.propTypes = {
  oamId: PropTypes.number.isRequired,
  showPointInfosHandle: PropTypes.func,
  stage: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

PointOam.defaultProps = {
  showPointInfosHandle: () => {},
}

export default PointOam
