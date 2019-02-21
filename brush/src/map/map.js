import React from 'react'
import PropTypes from 'prop-types'
import binary from 'binary'
import { Stage, Layer } from 'react-konva'
import {
  defaultTo,
  find,
  pipe,
  prop,
  range,
} from 'ramda'
import PointTile from './point/point-tile'
import PointOam from './point/point-oam'

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
    this.listOam = this.listOam.bind(this)

    this.state = {
      height: props.height,
      oam: props.oam,
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

    return <PointTile x={x} y={y} tileName={tileName} key={`${x} ${y}`} />
  }

  listOam () {
    return this.state.oam
      .map(i =>
        binary.parse(i)
          .word16lu('xStage1')
          .word16lu('yStage1')
          .skip(4)
          .word16lu('xStage2')
          .word16lu('yStage2')
          .skip(4)
          .word16lu('xStage3')
          .word16lu('yStage3')
          .skip(21)
          .word8lu('kind')
          .vars)
      .filter(({ kind }) =>
        kind !== null)
      .map(({
        kind,
        xStage1,
        xStage2,
        xStage3,
        yStage1,
        yStage2,
        yStage3,
      }) =>
        [
          <PointOam
            key={`${xStage1} ${yStage1} 1`}
            oamId={kind}
            stage={1}
            x={xStage1}
            y={yStage1}
          />,
          <PointOam
            key={`${xStage2} ${yStage2} 2`}
            oamId={kind}
            stage={2}
            x={xStage2}
            y={yStage2}
          />,
          <PointOam
            key={`${xStage3} ${yStage3} 3`}
            oamId={kind}
            stage={3}
            x={xStage3}
            y={yStage3}
          />,
        ])
  }

  render () {
    const tiles = listCoordinates(this.state.height, this.state.width)
      .map(([x, y]) => this.getPoint(x, y))
      .filter(i => i !== null)

    const oamList = this.listOam()

    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {tiles}
        </Layer>
        <Layer>
          {oamList}
        </Layer>
      </Stage>
    )
  }
}

Map.propTypes = {
  height: PropTypes.number.isRequired,
  oam: PropTypes.arrayOf(PropTypes.instanceOf(Buffer)).isRequired,
  scheme: PropTypes.arrayOf(PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.number).isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  tilemap: PropTypes.arrayOf(PropTypes.number).isRequired,
  width: PropTypes.number.isRequired,
}

export default Map
