import {
  filter,
  identical,
  map,
  not,
  pipe,
  splitEvery,
} from 'ramda'
import binary from 'binary'
import { huffmanDecode } from './huffman'
import { lzssDecode } from './lzss'

const isNumeric = pipe(t => Number(t), identical(NaN), not)

const extractFullTilemap = (romBuffer, [addressStart, addressEnd]) =>
  romBuffer.slice(addressStart, addressEnd)
  |> huffmanDecode
  |> lzssDecode

const extractOAM = (romBuffer, [addressStart, addressEnd]) =>
  romBuffer.slice(addressStart, addressEnd)
  |> splitEvery(44)
  |> map(memory => ({
    data: binary.parse(memory)
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
      .vars,
    memory,
  }))
  |> filter(({ data }) =>
    data.kind !== null)

const getVision = (romBuffer, world, vision) => {
  const infos = require(`./visions/${world}-${vision}.js`).default // eslint-disable-line

  // The first 3 bytes of tilemap isn't the tiles,
  // but something unknown important to plot the level at the game.
  // So this proxy is useful to abstract Brush about this detail
  const fullTilemap = extractFullTilemap(romBuffer, infos.rom.tilemap)

  const tilemapProxy = new Proxy(fullTilemap, {
    get: (target, property) => {
      if (isNumeric(property)) {
        const numericProp = Number(property)

        return target[numericProp + 3]
      }

      if (property === 'length') {
        return target.length - 4
      }

      return target[property]
    },
    set: (target, property, value) => {
      const self = target

      if (isNumeric(property)) {
        const numericProp = Number(property)
        self[numericProp + 3] = value

        return self
      }

      self[property] = value

      return self
    },
  })

  const oam = extractOAM(romBuffer, infos.rom.oam)

  return {
    infos,
    oam,
    tilemap: tilemapProxy,
  }
}

export default getVision
