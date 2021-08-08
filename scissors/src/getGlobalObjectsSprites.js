import binary from 'binary'

/**
 * Comments from [Ray1Map](https://github.com/Adsolution/Ray1Map/blob/12b1b1d84e8467cbfe950906d9a19e5dc41b48d1/Assets/Scripts/Managers/GBAKlonoa/GBAKlonoa_EOD_Manager.cs#L466-L471):
 * These animations are handled by the game manually copying the image data to VRAM, either in a global function or in one of the
 * level load functions. For simplicity we match them with the objects based on index if fix or object type if not. Hopefully this
 * will always work, assuming that every object of the same type will always have the same graphics. The way the game does this is
 * by having each object specify a tile index in VRAM (the OAM data) for what it should display. This allows each object to display
 * different graphics. Problem is we don't know what the tile index corresponds to as the VRAM is allocated differently for each
 * level and it is almost entirely hard-coded in the level load functions.
 */

// TODO: Cache the result of this function
const getGlobalObjectsSprites = (romBuffer) => {
  // [second system] single-frame objects
  const boxSpritePointer = 0x5F508
  const boxSprite = romBuffer.slice(
    boxSpritePointer,
    boxSpritePointer + 512
  )

  // [third system] animated objects

  const heartAnimationsPointerAddress = 0x18B9D8
  const { rawHeartSpritePointer } = binary.parse(romBuffer)
    .skip(heartAnimationsPointerAddress)
    .word32lu('rawHeartSpritePointer')
    .vars

  const heartSpritePointer = rawHeartSpritePointer - 0x08000000

  const heartSprite = romBuffer.slice(
    heartSpritePointer,
    heartSpritePointer + 128
  )

  const dreamStoneAnimationsPointerAddress = 0x18B9B8
  const { rawDreamStoneSpritePointer } = binary.parse(romBuffer)
    .skip(dreamStoneAnimationsPointerAddress)
    .word32lu('rawDreamStoneSpritePointer')
    .vars

  const dreamstoneSpritePointer = rawDreamStoneSpritePointer - 0x08000000

  const dreamstoneSprite = romBuffer.slice(
    dreamstoneSpritePointer,
    dreamstoneSpritePointer + 32
  )

  const largeDreamStoneAnimationsPointerAddress = 0x18B9C8
  const { rawLargeDreamStoneSpritePointer } = binary.parse(romBuffer)
    .skip(largeDreamStoneAnimationsPointerAddress)
    .word32lu('rawLargeDreamStoneSpritePointer')
    .vars

  const largeDreamstoneSpritePointer =
    rawLargeDreamStoneSpritePointer - 0x08000000

  const largeDreamstoneSprite = romBuffer.slice(
    largeDreamstoneSpritePointer,
    largeDreamstoneSpritePointer + 128
  )

  const starAnimationsPointerAddress = 0x18B9E8
  const { rawStarSpritePointer } = binary.parse(romBuffer)
    .skip(starAnimationsPointerAddress)
    .word32lu('rawStarSpritePointer')
    .vars

  const starSpritePointer = rawStarSpritePointer - 0x08000000

  const starSprite = romBuffer.slice(
    starSpritePointer,
    starSpritePointer + 128
  )

  const goomiAnimationsPointerAddress = 0x54B04
  const { rawGoomiSpritePointer } = binary.parse(romBuffer)
    .skip(goomiAnimationsPointerAddress)
    .word32lu('rawGoomiSpritePointer')
    .vars

  const goomiSpritePointer = rawGoomiSpritePointer - 0x08000000

  const goomiSprite = romBuffer.slice(
    goomiSpritePointer,
    goomiSpritePointer + 512
  )

  const redKeySpritePointer = 0x5F708 // there is no animation for red keys, so the sprites are stored directly here
  const redKeySprite = romBuffer.slice(
    redKeySpritePointer,
    redKeySpritePointer + 128
  )

  const blueKeySpritePointer = 0x5F788 // there is no animation for blue keys, so the sprites are stoblue directly here
  const blueKeySprite = romBuffer.slice(
    blueKeySpritePointer,
    blueKeySpritePointer + 128
  )

  const lockedDoorSpritePointer = 0x5F808 // there is no animation for red keys, so the sprites are stored directly here
  const lockedDoorSprite = romBuffer.slice(
    lockedDoorSpritePointer,
    lockedDoorSpritePointer + 512
  )

  // result

  const result = {
    // red key
    0x01: redKeySprite,
    // blue key
    0x02: blueKeySprite,
    // star
    0x03: starSprite,
    // door
    0x05: lockedDoorSprite,
    // heart
    0x07: heartSprite,
    // dream stone
    0x2C: dreamstoneSprite,
    // large dream stone
    0x2D: largeDreamstoneSprite,
    // goomi static
    0x2F: goomiSprite,
    // mobile goomi ⭥
    0x31: goomiSprite,
    // mobile goomi ⤡
    0x32: goomiSprite,
    // box
    0x6F: boxSprite,
  }

  return result
}

export default getGlobalObjectsSprites
