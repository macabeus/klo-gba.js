import {
  defaultTo,
  find,
  prop,
} from 'ramda'

const fromSchemeGetTileNameById = scheme => (id) => {
  if (id === 0x00) {
    return 'empty'
  }

  const tileName = scheme
  |> find(({ ids }) => ids.includes(id))
  |> defaultTo({ name: 'unknown' })
  |> prop('name')

  return tileName
}

export default fromSchemeGetTileNameById
