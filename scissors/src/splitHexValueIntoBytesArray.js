import { range } from 'ramda'

const splitHexValueIntoBytesArray = (hexValue, numberOfBytes) =>
  range(0, numberOfBytes).map((i) => {
    const shift = i * 8
    const byte = (hexValue >> shift) & 0xFF // eslint-disable-line no-bitwise

    return byte
  })

export default splitHexValueIntoBytesArray
