import { drop } from 'ramda'

const getVision = (world, vision) => {
  const tilemapBuffer = require(`../dump/vision-${world}-${vision}/tilemap.bin`) // eslint-disable-line
  const tilemap = drop(3, [...tilemapBuffer])

  const infos = require(`../dump/vision-${world}-${vision}/infos.js`).default // eslint-disable-line

  return {
    infos,
    tilemap,
  }
}

export default getVision
