import React from 'react'
import PropTypes from 'prop-types'
import { pipe } from 'ramda'
import Point from '.'

const mapTileNameToColor = {
  board: '199, 199, 199, 1',
  bridge: '200, 131, 63, 1',
  bridgeRope: '200, 131, 63, 0.5',
  darkRock: '90, 60, 63, 1',
  empty: '255, 255, 255, 0',
  grass: '0, 125, 0, 1',
  lightRock: '200, 100, 63, 1',
  rock: '160, 60, 63, 1',
  spike: '200, 20, 70, 1',
  unknown: '0, 0, 0, 1',
  wood: '188, 111, 93, 1',
}

const PointTile = ({
  showPointInfosHandle,
  tileName,
  tileValue,
  x,
  y,
}) => {
  const getInformations = () => ({
    message: `Tile ${tileName} (${tileValue})`,
    x,
    y,
  })

  return (<Point
    color={`rgba(${mapTileNameToColor[tileName]})`}
    onClickHandle={pipe(getInformations, showPointInfosHandle)}
    x={x}
    y={y}
  />)
}

PointTile.propTypes = {
  showPointInfosHandle: PropTypes.func,
  tileName: PropTypes.string.isRequired,
  tileValue: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

PointTile.defaultProps = {
  showPointInfosHandle: () => {},
}

export default PointTile
