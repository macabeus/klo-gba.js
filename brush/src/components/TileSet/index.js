import React, { useContext } from 'react'
import {
  groupBy,
  map,
  mapObjIndexed,
  uniq,
  values,
} from 'ramda'
import { fromSchemeGetTileNameById } from 'scissors'
import tileNameToColor from '../../constants/tileNameToColor'
import VisionContext from '../../context/VisionContext'
import style from './style.css'

const mapTilesIdsToBlock = map(({ id, name }) => (
  <p
    className={style.block}
    key={`${name} ${id}`}
    style={{ backgroundColor: `rgba(${tileNameToColor[name]})` }}
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

const TileSet = () => {
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
    |> map(tileId => ({
      id: tileId,
      name: getTileNameById(tileId),
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

export default TileSet
