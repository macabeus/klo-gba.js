import vision11 from './1-1'
import vision12 from './1-2'
import vision13 from './1-3'
import vision15 from './1-5'

const vision = {
  1: {
    1: vision11,
    2: vision12,
    3: vision13,
    5: vision15,
  },
}

const loadVisionInfo = (world, index) => vision[world][index]

const allVisions = [vision11, vision12, vision13, vision15]

export { loadVisionInfo, allVisions }
