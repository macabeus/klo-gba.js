import {
  defaultTo,
  find,
  pipe,
  prop,
} from 'ramda'

const fromSchemeGetTileNameById = scheme => id => pipe(
  find(({ ids }) => ids.includes(id)),
  defaultTo({ name: 'unknown' }),
  prop('name')
)(scheme)

export default fromSchemeGetTileNameById
