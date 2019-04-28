import { drop, splitEvery, map, filter } from 'ramda'
import binary from 'binary'
import huffmanDecode from './huffman'
import { lzssDecode } from './lzss'

const extractTilemap = (romBuffer, [addressStart, addressEnd]) =>
  romBuffer.slice(addressStart, addressEnd)
  |> huffmanDecode
  |> lzssDecode
  |> drop(3)

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

  const tilemap = extractTilemap(romBuffer, infos.rom.tilemap)
  const oam = extractOAM(romBuffer, infos.rom.oam)

  return {
    infos,
    oam,
    tilemap,
  }
}

export default getVision
