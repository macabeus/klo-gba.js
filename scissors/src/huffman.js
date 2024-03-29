const huffmanWasm = require('./wasm/huffman.wasm')

const huffmanModule = require('./wasm/huffman.js')({
  locateFile (path) {
    if (path.endsWith('.wasm')) {
      return `static/wasm/${huffmanWasm}`
    }

    return path
  },
})

const { FS } = huffmanModule

class HuffmanDecodeError extends Error {
  constructor (e) {
    super(`Error when tried to use huffman decoder: ${e}`)
    this.name = 'HuffmanDecodeError'
  }
}

huffmanModule.onRuntimeInitialized = () => {}

const huffmanDecode = (buffer) => {
  FS.writeFile('file', buffer)

  const result = huffmanModule._HUF_Decode() // eslint-disable-line no-underscore-dangle

  if (result === huffmanModule._error_not_huffman_encoded()) { // eslint-disable-line no-underscore-dangle
    throw new HuffmanDecodeError('It is not huffman encoded')
  }

  try {
    return huffmanModule.FS.readFile('file', { encoding: 'binary' })
  } catch (e) {
    throw new HuffmanDecodeError(e)
  }
}

const huffmanEncode = (buffer) => {
  FS.writeFile('input_huffman_encode', buffer)

  huffmanModule._HUF_Encode() // eslint-disable-line no-underscore-dangle

  try {
    return huffmanModule.FS.readFile('output_huffman_encode', { encoding: 'binary' })
  } catch (e) {
    throw new HuffmanDecodeError(e)
  }
}

export {
  huffmanDecode,
  huffmanEncode,
}
