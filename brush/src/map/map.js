import React from 'react'
import PropTypes from 'prop-types'
import { Stage, Layer } from 'react-konva'
import {
  defaultTo,
  find,
  pipe,
  prop,
  range,
} from 'ramda'
import Point from './point'

const listCoordinates = (height, width) => {
  const rangeHeight = range(0, height)
  const rangeWidth = range(0, width)

  const coordinates = rangeWidth.reduce((acc, i) => {
    rangeHeight.forEach(j => acc.push([i, j]))
    return acc
  }, [])

  return coordinates
}

const getTileNameFromScheme = tileValue => pipe(
  find(({ ids }) => ids.includes(tileValue)),
  defaultTo({ name: 'unknown' }),
  prop('name')
)

class Map extends React.Component {
  constructor (props) {
    super(props)

    this.getPoint = this.getPoint.bind(this)

    this.state = {
      height: props.height,
      scheme: props.scheme,
      tilemap: props.tilemap,
      width: props.width,
    }
  }

  getPoint (x, y) {
    const tileValue = this.state.tilemap[x + (y * this.state.width)]

    if (tileValue === 0x00) {
      return null
    }

    const tileName = getTileNameFromScheme(tileValue)(this.state.scheme)

    return <Point x={x} y={y} tileName={tileName} key={`${x} ${y}`} />
  }

  render () {
    const tiles = listCoordinates(this.state.height, this.state.width)
      .map(([x, y]) => this.getPoint(x, y))
      .filter(i => i !== null)

    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {tiles}
        </Layer>
      </Stage>
    )
  }
}

Map.propTypes = {
  height: PropTypes.number.isRequired,
  scheme: PropTypes.arrayOf(PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.number).isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  tilemap: PropTypes.arrayOf(PropTypes.number).isRequired,
  width: PropTypes.number.isRequired,
}

export default Map
