import React, { useContext } from 'react'
import { Button } from 'former-kit'
import FileReaderInput from 'react-file-reader-input'
import ROMContext from '../context/ROMContext'

const getFileContent = async file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onerror = (ev) => {
      reject(ev.target.error)
    }

    reader.onload = (ev) => {
      const buffer = ev.target.result
      resolve(new Uint8Array(buffer))
    }

    reader.readAsArrayBuffer(file)
  })

const handleChange = setROMBuffer => async (event, [[, file]]) =>
  (await getFileContent(file))
  |> setROMBuffer

const InputROM = () => {
  const { setROMBuffer } = useContext(ROMContext)

  return (
    <FileReaderInput as="binary" onChange={handleChange(setROMBuffer)}>
      <Button>Browse Files</Button>
    </FileReaderInput>
  )
}

export default InputROM
