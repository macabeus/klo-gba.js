import { Modal, ModalActions, ModalTitle } from 'former-kit'
import React from 'react'
import InputRomButton from './InputRomButton'

const InputRomModal = () => (
  <Modal isOpen>
    <ModalTitle
      title="Please, select your ROM file"
      titleAlign="center"
    />

    <ModalActions>
      <InputRomButton />
    </ModalActions>
  </Modal>
)

export default InputRomModal
