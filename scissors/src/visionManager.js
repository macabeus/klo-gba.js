import {
  filter,
  fromPairs,
  identical,
  map,
  mapObjIndexed,
  not,
  pipe,
  prop,
  splitEvery,
} from 'ramda'
import binary from 'binary'
import splitHexValueIntoBytesArray from './splitHexValueIntoBytesArray'
import { huffmanDecode, huffmanEncode } from './huffman'
import { lzssDecode, lzssEncode } from './lzss'
import { loadVisionInfo } from './visions'
import {
  setSign,
  setPatchCustomVisionLoader,
  visionHasCustomTilemap,
} from './rom'

const isNumeric = pipe(t => Number(t), identical(NaN), not)

const extractFullTilemap = (romBuffer, addressStart) =>
  romBuffer.slice(addressStart)
  |> huffmanDecode
  |> lzssDecode

const extractObjects = (romBuffer, [addressStart, addressEnd]) =>
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
      .skip(4)
      .word16lu('xStage4')
      .word16lu('yStage4')
      .skip(4)
      .word16lu('xStage5')
      .word16lu('yStage5')
      .skip(4)
      .word8lu('sprite')
      .word8lu('kind')
      .vars,
    memory,
  }))
  |> filter(({ data }) =>
    data.kind !== null)

const extractPortals = (romBuffer, [addressStart, addressEnd]) =>
  romBuffer.slice(addressStart, addressEnd)
  |> splitEvery(8)
  |> map(memory => ({
    data: binary.parse(memory)
      .word16lu('x')
      .word16lu('y')
      .skip(4)
      .vars,
    memory,
  }))
  |> filter(({ data }) =>
    data.kind !== null)

const getVisionSize = (romBuffer, world, vision) => {
  const bytesPerVision = 6
  const totalVisionsPerWorld = 9
  const worldsOffset = (world - 1) * totalVisionsPerWorld * bytesPerVision
  const visionsOffset = (vision - 1) * bytesPerVision

  const { height, width } = binary.parse(romBuffer)
    .skip(0x51C80)
    .skip(worldsOffset + visionsOffset)
    .word16lu('width')
    .skip(0x142)
    .word16lu('height')
    .vars

  return { height, width }
}

const getVision = (romBuffer, world, vision) => {
  const infos = loadVisionInfo(world, vision)
  const addressStart = visionHasCustomTilemap(romBuffer, infos) ?
    infos.rom.customTilemap :
    infos.rom.tilemap

  // The first 4 bytes of the tilemap isn't the tiles itself,
  // but a metadata important to uncompress the data.
  // So this proxy is useful to abstract to Brush this detail.
  const fullTilemap = extractFullTilemap(romBuffer, addressStart)

  const tilemapProxy = new Proxy(fullTilemap, {
    get: (target, property) => {
      if (isNumeric(property)) {
        const numericProp = Number(property)

        return target[numericProp + 4]
      }

      if (property === 'length') {
        return target.length - 4
      }

      if (property === 'full') {
        return target
      }

      return target[property]
    },
    set: (target, property, value) => {
      const self = target

      if (isNumeric(property)) {
        const numericProp = Number(property)
        self[numericProp + 4] = value

        return self
      }

      self[property] = value

      return self
    },
  })

  const objects = extractObjects(romBuffer, infos.rom.objects)
  const portals = extractPortals(romBuffer, infos.rom.portals)

  const tilemapSize = getVisionSize(romBuffer, Number(world), Number(vision))

  const objectsKindToSprite =
    objects.map(({ data: { kind, sprite } }) => [kind, sprite])
    |> fromPairs

  return {
    infos,
    objects,
    objectsKindToSprite,
    portals,
    tilemap: tilemapProxy,
    tilemapSize,
  }
}

const applyObjectsDiff = (romBuffer, objectsStartAddress, objectsDiffs) => {
  /* eslint-disable sort-keys */
  const mapKeyToOffsetAndSize = {
    xStage1: [0, 2],
    yStage1: [2, 2],
    xStage2: [8, 2],
    yStage2: [10, 2],
    xStage3: [16, 2],
    yStage3: [18, 2],
    xStage4: [24, 2],
    yStage4: [26, 2],
    xStage5: [32, 2],
    yStage5: [34, 2],
    sprite: [40, 1],
    kind: [41, 1],
  }
  /* eslint-enable sort-keys */

  const updateROM = (diffs, objectIndex) => {
    const objectMemoryAddressStart = objectsStartAddress + (objectIndex * 44)

    mapObjIndexed((value, key) => {
      const [offset, size] = mapKeyToOffsetAndSize[key]
      const bytes = splitHexValueIntoBytesArray(value, size)

      romBuffer.set(bytes, objectMemoryAddressStart + offset)
    }, diffs)
  }

  mapObjIndexed(updateROM, objectsDiffs)
}

const compressTilemap = buffer =>
  buffer
  |> prop('full')
  |> lzssEncode
  |> huffmanEncode

const saveVision = (romBuffer, world, index, tilemap, objectsDiffsMap) => {
  const infos = loadVisionInfo(world, index)
  const customTilemapStartAddress = infos.rom.customTilemap
  const [objectsStartAddress] = infos.rom.objects

  const encoded = compressTilemap(tilemap)
  romBuffer.set(encoded, customTilemapStartAddress)

  applyObjectsDiff(romBuffer, objectsStartAddress, objectsDiffsMap)

  setPatchCustomVisionLoader(romBuffer)

  setSign(romBuffer)

  return romBuffer
}

export {
  getVision,
  saveVision,
}
