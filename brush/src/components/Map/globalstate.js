const pointsRefs = {}

const addPointRef = (x, y, ref, paddingY) => {
  if (pointsRefs[x] === undefined) {
    pointsRefs[x] = []
  }

  pointsRefs[x][y] = {
    paddingY: y - paddingY,
    ref,
  }
}

const getPointRef = (x, y) => pointsRefs[x][y]

export {
  addPointRef,
  getPointRef,
}
