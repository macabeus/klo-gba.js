import { supportedRomRegions } from 'scissors'

const supportedRomRegionsMessage = supportedRomRegions.join(', ')

class RomRegionNotSupported extends Error {
  constructor (region) {
    let message
    if (region === 'unknown') {
      message = `This ROM is not supported. Please, send a ROM which region is one of these: ${supportedRomRegionsMessage}`
    } else {
      message = `The ROM region ${region} is not supported. Currently, we only support: ${supportedRomRegionsMessage}`
    }

    super(message)
    this.code = 'romRegionNotSupported'
  }
}

export default RomRegionNotSupported
