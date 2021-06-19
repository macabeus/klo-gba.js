import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import {
  groupBy,
  map,
  mapObjIndexed,
  uniq,
  values,
  reject,
} from 'ramda'
import { fromSchemeGetTileNameById } from 'scissors'
import tileNameToColor from '../../constants/tileNameToColor'
import VisionContext from '../../context/VisionContext'
import style from './style.css'

const hexToRGBAColor = ([hexColor, alpha]) => {
  const red = (hexColor >> 16) & 0xFF
  const green = (hexColor >> 8) & 0xFF
  const blue = hexColor & 0xFF

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

const mapTilesIdsToBlock = map(({ id, name, onClickHandle }) => (
  <p
    className={style.block}
    key={`${name} ${id}`}
    style={{ backgroundColor: hexToRGBAColor(tileNameToColor[name]) }}
    onClick={onClickHandle}
  >
    {id}
  </p>
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
    <span className={style.tileSet}>
      {groups}
    </span>
  )
}

TileSet.propTypes = {
  setToolState: PropTypes.func.isRequired,
}

export default TileSet
