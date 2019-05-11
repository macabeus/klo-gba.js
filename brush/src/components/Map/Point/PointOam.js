import React from 'react'
import PropTypes from 'prop-types'
import { defaultTo, pipe } from 'ramda'
import scissors from 'scissors'
import Point from '.'

const oamIdToColor = {
  0x03: '255, 232, 13, 1',
  0x07: '255, 110, 210, 1',
  0x2C: '179, 255, 98, 1',
  0x2D: '140, 255, 250',
  0x2E: '188, 201, 207, 1',
  0x6F: '205, 88, 81, 1',
  0x76: '67, 143, 54, 1',
  0x77: '33, 114, 43, 1',
  0x78: '33, 114, 43, 1',
}

const PointOam = ({
  oamId,
  showPointInfosHandle,
  stage,
  x,
  y,
}) => {
  const name = defaultTo('unknown', scissors.oamIdToName[oamId])
  const color = defaultTo('0, 0, 0, 1', oamIdToColor[oamId])

  const getInformations = () => ({
    message: `OAM ${name} (${oamId}) from stage ${stage}`,
    x,
    y,
  })

  return (<Point
    color={`rgba(${color})`}
    hasStroke
    onClickHandle={pipe(getInformations, showPointInfosHandle)}
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
