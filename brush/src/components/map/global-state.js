const pointsRefs = {}

const addPointRef = (x, y, ref) => {
  if (pointsRefs[x] === undefined) {
    pointsRefs[x] = []
  }

  pointsRefs[x][y] = ref
}

const getPointRef = (x, y) => pointsRefs[x][y]

export {
  addPointRef,
  getPointRef,
}
