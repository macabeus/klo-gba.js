import React, { useContext } from 'react'
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
import VisionContext from '../context/VisionContext'

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

const getPoint = (tilemap, width, scheme) => (x, y) => {
  const tileValue = tilemap[x + (y * width)]

  if (tileValue === 0x00) {
    return null
  }

  const tileName = getTileNameFromScheme(tileValue)(scheme)

  return <PointTile x={x} y={y} tileName={tileName} key={`${x} ${y}`} />
}

const listOam = oam =>
  oam
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

const Map = () => {
  const {
    infos: {
      tilemap: {
        height,
        scheme,
        width,
      },
    },
    oam,
    tilemap,
  } = useContext(VisionContext).vision

  const getPointFromTilemap = getPoint(tilemap, width, scheme)

  const tiles = listCoordinates(height, width)
    .map(([x, y]) => getPointFromTilemap(x, y))
    .filter(i => i !== null)

  const oamList = listOam(oam)

  return (
    <Stage width={width * 4} height={height * 4}>
      <Layer>
        {tiles}
      </Layer>
      <Layer>
        {oamList}
      </Layer>
    </Stage>
  )
}

export default Map
