import { allVisions } from './visions'

const mapAddressToRomOffset = hexValue => hexValue + 0x08000000

const split24LengthHexIntoBytesArray = (hexValue) => {
  /* eslint-disable no-bitwise */
  const firstByte = (hexValue >> 24)
  const secondByte = (hexValue >> 16) & 0xff
  const thirdByte = (hexValue >> 8) & 0xff
  const fourthByte = hexValue & 0xff
  /* eslint-enable no-bitwise */

  return [firstByte, secondByte, thirdByte, fourthByte]
}

const setSign = romBuffer =>
  romBuffer.set([0x42, 0x30], 0x367606) // add r0, 42h

const isCustomRom = (romBuffer) => {
  const sign = romBuffer.slice(0x367606, 0x367608)
  return sign[0] === 0x42 && sign[1] === 0x30
}

const visionHasCustomTilemap = (romBuffer, visionInfo) =>
  romBuffer[visionInfo.rom.customTilemap[0]] !== 0x00

const setConstant = (romBuffer, address, value24hexLength) => {
  const bytes = split24LengthHexIntoBytesArray(value24hexLength)
  romBuffer.set(bytes.reverse(), address)
}

const setPatchCustomVisionLoader = (romBuffer) => {
  const visionsWithCustomTilemap = allVisions.map(visionInfo =>
    visionHasCustomTilemap(romBuffer, visionInfo))

  const addresses = allVisions.map(visionInfo => ({
    custom: mapAddressToRomOffset(visionInfo.rom.customTilemap[0]),
    original: mapAddressToRomOffset(visionInfo.rom.tilemap[0]),
  }))

  // set bl to go to our patch
  romBuffer.set([0x23, 0xF3, 0x80, 0xFD], 0x43B0C) // bl 08367610h

  // switch to arm mode and run our code
  romBuffer.set([0x78, 0x46], 0x367610) // mov r0,r15
  romBuffer.set([0x3C, 0x30], 0x367612) // add r0, 3Ch
  romBuffer.set([0x00, 0x47], 0x367614) // bx r0

  // write original and custom address of each vision
  addresses.forEach(({ custom, original }, index) => {
    const offset = 0x367620 + (index * 8)

    setConstant(romBuffer, offset, original)
    setConstant(romBuffer, offset + 4, custom)
  })

  // change value at R0 to custom address if need
  romBuffer.set([0x04, 0x00, 0x85, 0xE2], 0x367650) // add r0, r5, 4h

  addresses.forEach((_, index) => {
    if (visionsWithCustomTilemap[index]) {
      const offset1 = 0x3C + ((index * 12) - (index * 8))
      const offset2 = 0x40 + ((index * 12) - (index * 8))

      romBuffer.set([offset1, 0x40, 0x1F, 0xE5], 0x367654 + (index * 12)) // ldr r4,[r15,#-offset1]
      romBuffer.set([0x04, 0x00, 0x50, 0xE1], 0x367658 + (index * 12)) // cmp r0, r4
      romBuffer.set([offset2, 0x00, 0x1F, 0x05], 0x36765C + (index * 12)) // ldreq r0,[r15,#-offset2]
    }
  })

  romBuffer.set([0x01, 0x40, 0xA0, 0xE1], 0x367660 + (addresses.length * 12)) // mov r4, r1
  romBuffer.set([0x1E, 0xFF, 0x2F, 0xE1], 0x367664 + (addresses.length * 12)) // bx r14
}

export {
  isCustomRom,
  setSign,
  setPatchCustomVisionLoader,
  visionHasCustomTilemap,
}
