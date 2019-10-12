import React, { useContext, useState } from 'react'
import {
  Alert,
  Button,
  Grid,
  Row,
  Col,
  Modal,
  ModalTitle,
  Flexbox,
} from 'former-kit'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'
import InputRomButton from './InputRomButton'
import ROMContext from '../../context/ROMContext'
import KlonoaModal from '../../../assets/Klonoa_modal_vector.svg'

const InputRomModal = () => {
  const { cancelOnHoldROMBufferState, romBufferStatus } = useContext(ROMContext)
  const [error, setError] = useState(null)

  return (
    <Modal isOpen>
      <Grid>
        {
          error
          && (
            <Alert type="error" icon={<IconClose height={16} width={16} />}>
              <p><strong>Error.</strong> {error.message}</p>
            </Alert>
          )
        }
        <Row>
          <Col palm={6} tv={6} desk={6} tablet={6}>
            <KlonoaModal style={{ padding: '4px' }} />
          </Col>

          <Col palm={6} tv={6} desk={6} tablet={6}>
            <Flexbox justifyContent="center">
              <ModalTitle title="Please, select your ROM file" />

              <InputRomButton setError={setError} />

              {
                romBufferStatus === 'holding'
                && <Button relevance="low" fill="clean" onClick={cancelOnHoldROMBufferState}>Cancel</Button>
              }
            </Flexbox>
          </Col>
        </Row>
      </Grid>
    </Modal>
  )
}

export default InputRomModal
