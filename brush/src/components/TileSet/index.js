import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import {
  drop,
  groupBy,
  map,
  mapObjIndexed,
  splitEvery,
  uniq,
  values,
  reject,
} from 'ramda'
import { fromSchemeGetTileNameById } from 'scissors'
import VisionContext from '../../context/VisionContext'
import style from './style.css'

const documentCanvasGenerator = (index) => (
  width,
  height
) => {
  const canvas = document.getElementById(`canvas${index}`)

  canvas.width = width
  canvas.height = height
  canvas.style = 'margin: 1px'

  return canvas
}

const drawTile = (tile, canvasGenerator, palette) => {
  const canvas = canvasGenerator(8, 8)

  const context = canvas.getContext('2d')

  tile.forEach((paletteIndex, tileIndex) => {
    const x = tileIndex % 8
    const y = Math.floor(tileIndex / 8)

    const [red, green, blue] = palette[paletteIndex]

    context.fillStyle = `rgb(${red}, ${green}, ${blue})`
    context.fillRect(x, y, 1, 1)
  })

  return canvas
}

const draw = () => {
  const { tileset } = window
  const tilesetList =
    splitEvery(64, tileset)
    |> drop(1)

  tilesetList.forEach(
    (tile, index) =>
      drawTile(tile, documentCanvasGenerator(index + 1), window.palette)
  )
}

const mapTilesIdsToBlock = map(({ id, name, onClickHandle }) => (
  <canvas
    key={`${name} ${id}`}
    id={`canvas${id}`}
    onClick={onClickHandle}
  />
))

const makeTilesGroup = (tiles, name) => (
  <div className={style.group} key={name}>
    <h4 className={style.title}>{name}</h4>
    {mapTilesIdsToBlock(tiles)}
  </div>
)

const TileSet = ({ setToolState }) => {
  const {
    vision: {
      infos: {
        tilemap: {
          scheme,
        },
      },
      tilemap,
    },
  } = useContext(VisionContext)

  const getTileNameById = fromSchemeGetTileNameById(scheme)

  const groups =
    tilemap
    |> uniq
    |> reject(tileId => tileId === 0x00)
    |> map(tileId => ({
      id: tileId,
      name: getTileNameById(tileId),
      onClickHandle: () => { setToolState('brush', tileId) },
    }))
    |> groupBy(({ name }) => name)
    |> mapObjIndexed(makeTilesGroup)
    |> values

  return (
    <>
      <button type="button" onClick={draw}>draw</button>
      <span className={style.tileSet}>
        {groups}
      </span>
    </>
  )
}

TileSet.propTypes = {
  setToolState: PropTypes.func.isRequired,
}

export default TileSet
