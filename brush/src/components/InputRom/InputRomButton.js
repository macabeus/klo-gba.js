import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Button, Flexbox } from 'former-kit'
import { getRomRegion, isSupportedRegion } from 'scissors'
import FileReaderInput from 'react-file-reader-input'
import RomRegionNotSupported from '../../errors/romRegioNotSupported'
import ROMContext from '../../context/ROMContext'
import style from './style.css'

const getFileContent = async file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onerror = (ev) => {
      reject(ev.target.error)
    }

    reader.onload = (ev) => {
      const buffer = new Uint8Array(ev.target.result)

      const region = getRomRegion(buffer)

      if (isSupportedRegion(region)) {
        resolve(buffer)
        return
      }

      reject(new RomRegionNotSupported(region))
    }

    reader.readAsArrayBuffer(file)
  })

const handleChange = (setROMBuffer, onErrorHandle) =>
  async (event, [[, file]]) => {
    let fileContent

    try {
      fileContent = await getFileContent(file)
    } catch (e) {
      onErrorHandle(e)
      return
    }

    setROMBuffer(fileContent)
  }

const InputROM = ({ setError }) => {
  const { setROMBuffer } = useContext(ROMContext)

  return (
    <Flexbox justifyContent="center" className={style.alertMargin}>
      <FileReaderInput as="binary" onChange={handleChange(setROMBuffer, setError)}>
        <Button>Browse Files</Button>
      </FileReaderInput>
    </Flexbox>
  )
}

InputROM.propTypes = {
  setError: PropTypes.func,
}

InputROM.defaultProps = {
  setError: () => {},
}

export default InputROM
