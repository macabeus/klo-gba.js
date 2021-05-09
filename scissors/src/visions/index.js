import visionEnteringGbaState11 from './entering-gba-state/1-1.json'
import visionEnteringGbaState12 from './entering-gba-state/1-2.json'
import visionEnteringGbaState13 from './entering-gba-state/1-3.json'
import visionEnteringGbaState15 from './entering-gba-state/1-5.json'
import visionInfo11 from './infos/1-1'
import visionInfo12 from './infos/1-2'
import visionInfo13 from './infos/1-3'
import visionInfo15 from './infos/1-5'

const visionsMap = {
  1: {
    1: { info: visionInfo11, enteringGbaState: visionEnteringGbaState11 },
    2: { info: visionInfo12, enteringGbaState: visionEnteringGbaState12 },
    3: { info: visionInfo13, enteringGbaState: visionEnteringGbaState13 },
    5: { info: visionInfo15, enteringGbaState: visionEnteringGbaState15 },
  },
}

const loadVisionInfo = (world, index) => visionsMap[world][index].info

const allVisions = [visionInfo11, visionInfo12, visionInfo13, visionInfo15]

const enteringVisionGbaState = (world, index) => visionsMap[world][index].enteringGbaState

export { loadVisionInfo, allVisions, enteringVisionGbaState }
