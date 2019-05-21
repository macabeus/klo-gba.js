import React, { useContext, useState } from 'react'
import { Alert, Button, Flexbox } from 'former-kit'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'
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

const InputROM = () => {
  const { setROMBuffer } = useContext(ROMContext)
  const [error, setError] = useState(null)

  return (
    <Flexbox justifyContent="center" className={style.alertMargin}>
      {
        error &&
        <Alert type="error" icon={<IconClose height={16} width={16} />}>
          <p><strong>Error.</strong> {error.message}</p>
        </Alert>
      }

      <FileReaderInput as="binary" onChange={handleChange(setROMBuffer, setError)}>
        <Button>Browse Files</Button>
      </FileReaderInput>
    </Flexbox>
  )
}

export default InputROM
