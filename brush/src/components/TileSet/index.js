import React, { useContext } from 'react'
import PropTypes from 'prop-types'
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

const mapTilesIdsToBlock = map(({ id, name, onClickHandle }) => (
  // TODO: disabling these rules because we are using <p> temporarily until a better UI is developed
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
  <p
    className={style.block}
    key={`${name} ${id}`}
    style={{ backgroundColor: `rgba(${tileNameToColor[name]})` }}
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

const TileSet = ({ onSelectTile }) => {
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
      onClickHandle: () => { onSelectTile(tileId) },
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
  onSelectTile: PropTypes.func.isRequired,
}

export default TileSet
