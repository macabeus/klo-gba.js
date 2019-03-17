import React from 'react'
import InputROM from './InputROM'
import { Modal, ModalActions, ModalTitle } from 'former-kit'

const InputROMModal = () => {
  const childrenNode = <div>
    <ModalTitle
      title="Please, select your ROM file"
      titleAlign="center"/>
    <ModalActions children={<InputROM />} />
  </div>

  return (
    <Modal
      children={childrenNode}
      isOpen={true}
    />
  )
}

export default InputROMModal
