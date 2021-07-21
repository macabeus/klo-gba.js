const lzssWasm = require('./wasm/lzss.wasm')

const lzssModule = require('./wasm/lzss.js')({
  locateFile (path) {
    if (path.endsWith('.wasm')) {
      return `static/wasm/${lzssWasm}`
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

  const result = lzssModule._LZS_Decode() // eslint-disable-line no-underscore-dangle

  if (result === lzssModule._error_not_lzss_encoded()) { // eslint-disable-line no-underscore-dangle
    throw new LzssDecodeError('It is not LZSS encoded')
  }

  try {
    return lzssModule.FS.readFile('filelzss', { encoding: 'binary' })
  } catch (e) {
    throw new LzssDecodeError(e)
  }
}

const lzssEncode = (buffer) => {
  FS.writeFile('input_lzss_encode', buffer)

  lzssModule._LZS_Encode() // eslint-disable-line no-underscore-dangle

  try {
    return lzssModule.FS.readFile('output_lzss_encode', { encoding: 'binary' })
  } catch (e) {
    throw new LzssDecodeError(e)
  }
}

export {
  lzssDecode,
  lzssEncode,
}
