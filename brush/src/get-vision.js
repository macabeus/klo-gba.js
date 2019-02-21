import { drop, splitEvery } from 'ramda'

const getVision = (world, vision) => {
  const tilemapBuffer = require(`../dump/vision-${world}-${vision}/tilemap.bin`) // eslint-disable-line
  const tilemap = drop(3, [...tilemapBuffer])

  const oam = splitEvery(44, require(`../dump/vision-${world}-${vision}/oam.bin`)) // eslint-disable-line

  const infos = require(`../dump/vision-${world}-${vision}/infos.js`).default // eslint-disable-line

  return {
    infos,
    oam,
    tilemap,
  }
}

export default getVision
