import React from 'react'
import PropTypes from 'prop-types'
import { pipe } from 'ramda'
import tileNameToColor from '../../../constants/tileNameToColor'
import Point from '.'

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
    color={`rgba(${tileNameToColor[tileName]})`}
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
