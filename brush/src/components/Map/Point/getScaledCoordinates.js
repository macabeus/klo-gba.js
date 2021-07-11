const SIZE = 8

const getScaledCoordinates = (x, y, scale) => (scale === 1 ?
  [
    x * SIZE,
    y * SIZE,
  ] :
  [
    ((x * SIZE) / scale) - SIZE,
    ((y * SIZE) / scale) - SIZE,
  ])

export default getScaledCoordinates
export { SIZE }
