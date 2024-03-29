import {
  drop,
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
import getGlobalObjectsSprites from './getGlobalObjectsSprites'
import getVisionObjectsPalettes from './getVisionObjectPalettes'

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

const getPalette = (romBuffer, world, vision) => {
  const bytesPerVision = 4
  const totalVisionsPerWorld = 9
  const worldsOffset = (world - 1) * totalVisionsPerWorld * bytesPerVision
  const visionsOffset = (vision - 1) * bytesPerVision

  const { rawPaletteAddress } = binary.parse(romBuffer)
    .skip(0x188F60)
    .skip(worldsOffset + visionsOffset)
    .word32lu('rawPaletteAddress')
    .vars

  const paletteAddress = rawPaletteAddress - 0x08000000

  const palette = romBuffer.slice(paletteAddress + 4)
    |> huffmanDecode
    |> lzssDecode
    |> drop(4)
    |> splitEvery(2)
    |> map(([firstByte, secondByte]) => {
      const gba15 = (secondByte << 8) + firstByte

      const red = (gba15 & 31) << 3
      const green = ((gba15 >> 5) & 31) << 3
      const blue = ((gba15 >> 10) & 31) << 3

      return [red, green, blue]
    })

  return palette
}

const getTileset = (romBuffer, world, vision) => {
  const bytesPerVision = 12
  const totalVisionsPerWorld = 9
  const worldsOffset = (world - 1) * totalVisionsPerWorld * bytesPerVision
  const visionsOffset = (vision - 1) * bytesPerVision

  const { rawTilesetAddress } = binary.parse(romBuffer)
    .skip(0x189048)
    .skip(worldsOffset + visionsOffset)
    .word32lu('rawTilesetAddress')
    .vars

  const tilesetAddress = rawTilesetAddress - 0x08000000

  const tileset = romBuffer.slice(tilesetAddress + 4)
    |> huffmanDecode
    |> lzssDecode
    |> drop(4)
    |> splitEvery(64)

  return tileset
}

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

const getObjectsPalettesIndexes = (romBuffer, totalObjects, world, vision) => {
  const bytesPerVision = 4
  const totalVisionsPerWorld = 9
  const worldsOffset = (world - 1) * totalVisionsPerWorld * bytesPerVision
  const visionsOffset = (vision - 1) * bytesPerVision
  const pointersOffset = worldsOffset + visionsOffset

  const { rawOamPointerArrayStart } = binary.parse(romBuffer)
    .skip(0x18B8E4)
    .skip(pointersOffset)
    .word32lu('rawOamPointerArrayStart')
    .vars

  const oamPointerArrayStart = rawOamPointerArrayStart - 0x08000000

  let loopIndex = 0
  const rawOamPointers = []
  binary.parse(romBuffer)
    .skip(oamPointerArrayStart)
    .loop(function loop (end) {
      const { rawOamPointer } = this
        .skip(4)
        .word32lu('rawOamPointer')
        .vars

      rawOamPointers.push(rawOamPointer)

      loopIndex += 1

      if (loopIndex === (totalObjects + 1)) {
        end()
      }
    })

  const objectsPaletteIndexes = rawOamPointers.map(rawOamPointer => {
    const oamPointer = rawOamPointer - 0x08000000

    const {
      tileIndexVRAM,
      paletteIndex,
      relativeX,
      relativeY,
    } = binary.parse(romBuffer)
      .skip(oamPointer)
      .word16lu('tileIndexVRAM')
      .word8lu('paletteIndex')
      .word8ls('relativeX')
      .word8ls('relativeY')
      .vars

    return {
      tileIndexVRAM,
      paletteIndex,
      relativeX,
      relativeY,
    }
  })

  return objectsPaletteIndexes
}

const getLocalObjectsSprite = (romBuffer, totalObjects, world, vision) => {
  const bytesPerVision = 4
  const totalVisionsPerWorld = 9
  const worldsOffset = (world - 1) * totalVisionsPerWorld * bytesPerVision
  const visionsOffset = (vision - 1) * bytesPerVision
  const pointersOffset = worldsOffset + visionsOffset

  const { rawObjectsSpriteAddress } = binary.parse(romBuffer)
    .skip(0x189A28)
    .skip(pointersOffset)
    .word32lu('rawObjectsSpriteAddress')
    .vars

  const objectsSpriteAddress = rawObjectsSpriteAddress - 0x08000000

  let loopIndex = 0
  const localObjectsSprites = []
  binary.parse(romBuffer)
    .skip(objectsSpriteAddress)
    .loop(function loop (end) {
      const { rawAnimationsPointer, tilesetLength } = this
        .word32lu('rawAnimationsPointer')
        .skip(4)
        .word16lu('tilesetLength')
        .skip(2)
        .vars

      const animationsPointer = rawAnimationsPointer - 0x08000000

      const { rawFirstAnimationFramePointer } = binary.parse(romBuffer)
        .skip(animationsPointer)
        .word32lu('rawFirstAnimationFramePointer')
        .vars

      const firstAnimationFramePointer =
        rawFirstAnimationFramePointer - 0x08000000

      const { rawTilesetPointer } = binary.parse(romBuffer)
        .skip(firstAnimationFramePointer)
        .word32lu('rawTilesetPointer')
        .vars

      const tilesetPointer = rawTilesetPointer - 0x08000000

      const objectsSprite = romBuffer.slice(
        tilesetPointer,
        tilesetPointer + tilesetLength
      )

      localObjectsSprites.push(objectsSprite)

      loopIndex += 1

      if (loopIndex === (totalObjects + 1)) {
        end()
      }
    })

  return localObjectsSprites
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

  const tileset = getTileset(romBuffer, Number(world), Number(vision))

  const palette = getPalette(romBuffer, Number(world), Number(vision))

  const visionObjectsPalettes = getVisionObjectsPalettes(
    romBuffer,
    Number(world),
    Number(vision)
  )

  const objectsPaletteIndexes = getObjectsPalettesIndexes(
    romBuffer,
    objects.length,
    Number(world),
    Number(vision)
  )

  const localObjectsSprites = getLocalObjectsSprite(
    romBuffer,
    objects.length,
    Number(world),
    Number(vision)
  )

  const globalObjectsSprites = getGlobalObjectsSprites(romBuffer)

  const objectsKindToSprite =
    objects.map(({ data: { kind, sprite } }) => [kind, sprite])
    |> fromPairs

  return {
    infos,
    objects,
    objectsKindToSprite,
    palette,
    localObjectsSprites,
    globalObjectsSprites,
    visionObjectsPalettes,
    objectsPaletteIndexes,
    portals,
    tilemap: tilemapProxy,
    tilemapSize,
    tileset,
  }
}

const applyObjectsDiff = (romBuffer, objectsStartAddress, objectsDiffs) => {
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
