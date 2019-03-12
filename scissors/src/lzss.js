const lzssWasm = require('./wasm/lzss.wasm')

const lzssModule = require('./wasm/lzss.js')({
  locateFile (path) {
    if (path.endsWith('.wasm')) {
      return `node_modules/scissors/dist/${lzssWasm}`
    }

    return path
  },
})

const { FS } = lzssModule

class LzssDecodeError extends Error {
  constructor (e) {
    super(`Error when tried to use lzss decoder: ${e}`)
    this.name = 'lzssDecodeError'
  }
}

lzssModule.onRuntimeInitialized = () => {}

const lzssDecode = (buffer) => {
  FS.writeFile('filelzss', buffer)

  lzssModule._LZS_Decode() // eslint-disable-line no-underscore-dangle

  try {
    return lzssModule.FS.readFile('filelzss', { encoding: 'binary' })
  } catch (e) {
    throw new LzssDecodeError(e)
  }
}

export default lzssDecode
