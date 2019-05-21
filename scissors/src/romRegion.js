import { defaultTo } from 'ramda'
import sha1 from 'js-sha1'

const getRomRegion = (buffer) => {
  const hash = sha1(buffer)

  const hashToRegion = {
    a0a298d9dba1ba15d04a42fc2eb35893d1a9569b: 'usa',
    e4a81713b134e0b7409708843dad2a4948b903ef: 'europe',
    f46410ec245dbb6fa90285c6d4071c09cc983b05: 'japan',
  }

  const region = defaultTo('unknown', hashToRegion[hash])
  return region
}

const supportedRomRegions = ['usa']

const isSupportedRegion = region => supportedRomRegions.includes(region)

export { getRomRegion, supportedRomRegions, isSupportedRegion }
