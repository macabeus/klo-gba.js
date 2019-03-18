import { Modal, ModalActions, ModalTitle } from 'former-kit'
import React from 'react'
import InputROM from './InputROM'

const InputROMModal = () => (
  <Modal isOpen>
    <ModalTitle
      title="Please, select your ROM file"
      titleAlign="center"
    />

    <ModalActions>
      <InputROM />
    </ModalActions>
  </Modal>
)

export default InputROMModal
