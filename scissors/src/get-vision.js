import { drop, splitEvery } from 'ramda'
import huffmanDecode from './huffman'
import lzssDecode from './lzss'

const extractTilemap = (romBuffer, [addressStart, addressEnd]) =>
  romBuffer.slice(addressStart, addressEnd)
  |> huffmanDecode
  |> lzssDecode
  |> drop(3)

const extractOAM = (romBuffer, [addressStart, addressEnd]) =>
  romBuffer.slice(addressStart, addressEnd)
  |> splitEvery(44)

const getVision = (romBuffer, world, vision) => {
  const infos = require(`./visions/${world}-${vision}.js`).default // eslint-disable-line

  const tilemap = extractTilemap(romBuffer, infos.rom.tilemap)
  const oam = extractOAM(romBuffer, infos.rom.oam)

  return {
    infos,
    oam,
    tilemap,
  }
}

export default getVision
