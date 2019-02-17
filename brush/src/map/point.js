import React from 'react'
import PropTypes from 'prop-types'
import { Rect } from 'react-konva'

const mapTileNameToColor = {
  board: '199, 199, 199, 1',
  bridge: '200, 131, 63, 1',
  bridgeRope: '200, 131, 63, 0.5',
  darkRock: '90, 60, 63, 1',
  grass: '0, 125, 0, 1',
  lightRock: '200, 100, 63, 1',
  rock: '160, 60, 63, 1',
  spike: '200, 20, 70, 1',
  unknown: '0, 0, 0, 1',
  wood: '188, 111, 93, 1',
}

const Point = ({ tileName, x, y }) => (
  <Rect
    x={x * 3}
    y={y * 3}
    width={3}
    height={3}
    fill={`rgba(${mapTileNameToColor[tileName]})`}
  />
)

Point.propTypes = {
  tileName: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

export default Point
