import React from 'react'
import PropTypes from 'prop-types'
import Point from '.'

const mapOamIdToInfos = {
  0x03: {
    color: '255, 232, 13, 1',
    name: 'star',
  },
  0x07: {
    color: '255, 110, 210, 1',
    name: 'heart',
  },
  0x2C: {
    color: '179, 255, 98, 1',
    name: 'dreamStone',
  },
  0x2D: {
    color: '140, 255, 250',
    name: 'dreamStoneLarge',
  },
  0x2E: {
    color: '188, 201, 207, 1',
    name: 'oneUp',
  },
  0x6F: {
    color: '205, 88, 81, 1',
    name: 'box',
  },
  0x76: {
    color: '67, 143, 54, 1',
    name: 'moo',
  },
  0x77: {
    color: '33, 114, 43, 1',
    name: 'flyingMooHorizontal',
  },
  0x78: {
    color: '33, 114, 43, 1',
    name: 'flyingMooVerical',
  },
}

const getOamInfosById = (oamId) => {
  if (mapOamIdToInfos[oamId] !== undefined) {
    return mapOamIdToInfos[oamId]
  }

  return {
    color: '0, 0, 0, 1',
    name: 'unknown',
  }
}

const PointOam = ({
  oamId,
  stage,
  x,
  y,
}) => {
  const { color, name } = getOamInfosById(oamId)

  return (<Point
    color={`rgba(${color})`}
    debugMessage={`OAM ${name} (${oamId}); x ${x} y ${y} stage ${stage}`}
    hasStroke
    scale={8}
    x={x}
    y={y}
  />)
}

PointOam.propTypes = {
  oamId: PropTypes.number.isRequired,
  stage: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

export default PointOam
