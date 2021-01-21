class RomInvalidExtension extends Error {
  constructor () {
    super('Invalid ROM file extension. The file should be uncompressed')
    this.code = 'romInvalidExtension'
  }
}

export default RomInvalidExtension
