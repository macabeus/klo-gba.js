import {
  map,
  splitEvery,
} from 'ramda'

const mapWorldAndVisionToPalettes = {
  1: {
    0: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    1: [39, 40, 41, 42, 43, 44],
    2: [39, 40, 45, 46, 42, 43, 44],
    3: [39, 40, 41, 45, 46, 47, 42, 43, 44],
    4: [40, 41, 45, 48, 43, 44],
    5: [39, 40, 41, 49, 45, 46, 47, 42, 43, 44],
    6: [50, 41, 49, 45, 43, 44],
    7: [39, 40, 49, 45, 51, 46, 47, 42, 43, 44],
    8: [52, 53, 54, 55, 40, 56, 54, 57],
  },

  2: {
    0: [6, 11, 12, 13, 14, 15, 16],
    1: [39, 40, 41, 45, 58, 46, 47, 42, 43, 44],
    2: [39, 40, 41, 59, 58, 45, 46, 47, 42, 43, 44],
    3: [39, 40, 41, 59, 49, 46, 60, 47, 42, 43, 44],
    4: [40, 41, 45, 58, 48, 43, 44],
    5: [39, 40, 41, 45, 49, 51, 58, 61, 46, 47, 43, 44],
    6: [50, 40, 41, 49, 45, 51, 43, 44],
    7: [39, 40, 41, 58, 62, 61, 63, 46, 47, 43, 44],
    8: [52, 53, 54, 64, 40, 65, 66, 67, 44],
  },

  3: {
    0: [6, 17, 18, 19, 20, 21, 22, 23],
    1: [39, 40, 49, 68, 46, 69, 47, 42, 43, 44],
    2: [39, 41, 49, 68, 46, 69, 47, 42, 43, 44],
    3: [39, 41, 49, 51, 68, 69, 47, 42, 43, 44],
    4: [40, 41, 45, 58, 48, 43, 44],
    5: [39, 49, 68, 46, 70, 61, 47, 43],
    6: [50, 40, 41, 49, 59, 45, 43, 44],
    7: [39, 41, 58, 68, 46, 70, 61, 71, 43, 44],
    8: [52, 53, 54, 72, 41, 73, 72, 75, 44],
  },

  4: {
    0: [6, 24, 25, 26, 27, 28, 29, 30, 31, 32],
    1: [39, 40, 41, 58, 49, 76, 46, 77, 83, 47, 42, 43, 44],
    2: [39, 40, 41, 58, 59, 49, 46, 43, 83, 47, 42, 44],
    3: [39, 41, 59, 49, 45, 76, 46, 47, 42, 43, 44],
    4: [40, 41, 45, 58, 48, 43, 44],
    5: [39, 40, 46, 68, 77, 78, 81, 47, 42, 43, 44],
    6: [50, 40, 41, 49, 59, 45, 51, 43, 44],
    7: [39, 40, 41, 58, 82, 46, 42, 43, 83, 81, 47, 44],
    8: [52, 53, 54, 84, 40, 85, 81, 44],
  },

  5: {
    0: [6, 33, 34, 35, 36, 37, 38],
    1: [39, 40, 45, 86, 47, 42, 43, 44],
    2: [39, 40, 41, 45, 51, 68, 86, 61, 47, 43, 44],
    3: [39, 40, 45, 86, 68, 87, 46, 61, 81, 43, 44],
    4: [40, 41, 45, 58, 48, 43, 44],
    5: [39, 40, 41, 59, 45, 58, 86, 76, 79, 47, 42, 43, 44],
    6: [50, 40, 41, 49, 59, 45, 43, 44],
    7: [39, 40, 41, 51, 59, 45, 86, 68, 46, 47, 88, 42, 43, 44],
    8: [52, 53, 54, 89, 40, 90, 91, 44],
  },

  6: {
    0: [6],
    1: [39, 40, 41, 49, 59, 45, 51, 58, 87, 42, 43, 44],
    2: [39, 40, 41, 59, 49, 51, 58, 68, 45, 46, 42, 47, 43, 44],
    3: [39, 40, 41, 45, 51, 92, 63, 42, 43, 44],
    4: [39, 40, 41, 45, 51, 92, 63, 42, 43, 44],
    5: [39, 40, 41, 45, 51, 92, 63, 42, 43, 44],
    6: [39, 40, 41, 45, 51, 92, 63, 42, 43, 44],
    7: [39, 40, 41, 45, 51, 92, 63, 42, 43, 44],
    8: [52, 53, 54, 93, 94, 40, 40, 96, 97, 98, 44],
  },
}

// TODO: Cache the result of this function
const getGlobalObjectsPalette = (romBuffer) => {
  const totalPalettes = 141
  const bytesPerColor = 2
  const colorsPerPalette = 16
  const paletteSize = colorsPerPalette * bytesPerColor

  const globalObjectsPaletteAddress = 0x077E28

  const globalObjectsPalette = romBuffer.slice(
    globalObjectsPaletteAddress,
    globalObjectsPaletteAddress + (totalPalettes * paletteSize)
  )
    |> splitEvery(paletteSize)
    |> map(rawPalette =>
      rawPalette
        |> splitEvery(2)
        |> map(([firstByte, secondByte]) => {
          // TODO: Improve code reuse with the getPalette function
          const gba15 = (secondByte << 8) + firstByte

          const red = (gba15 & 31) << 3
          const green = ((gba15 >> 5) & 31) << 3
          const blue = ((gba15 >> 10) & 31) << 3

          return [red, green, blue]
        }))

  return globalObjectsPalette
}

const getVisionObjectsPalettes = (romBuffer, world, vision) => {
  const globalObjectsPalette = getGlobalObjectsPalette(romBuffer)

  const palettes = [
    globalObjectsPalette[0],
    globalObjectsPalette[1],
    ...mapWorldAndVisionToPalettes[world][vision].map(paletteIndex =>
      globalObjectsPalette[paletteIndex]),
  ]

  return palettes
}

export default getVisionObjectsPalettes
