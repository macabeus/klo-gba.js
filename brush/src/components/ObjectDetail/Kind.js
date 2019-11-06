import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Dropdown } from 'former-kit'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'
import IconEdit from 'emblematic-icons/svg/Edit32.svg'
import { objectIdToName } from 'scissors'
import VisionContext from '../../context/VisionContext'
import style from './style.css'

const ToggleDropdownKind = ({
  currentKind,
  finishEditHandle,
  isEditing,
  objectIndex,
}) => {
  const {
    updateObjectsDiffMap,
    vision: {
      objectsKindToSprite,
    },
  } = useContext(VisionContext)

  const objectsKind = Object.keys(objectsKindToSprite)

  if (isEditing === false) {
    return (
      <span>{objectIdToName[currentKind]}</span>
    )
  }

  const updateKind = (newKind) => {
    updateObjectsDiffMap(objectIndex, 'kind', Number(newKind))
    updateObjectsDiffMap(objectIndex, 'sprite', objectsKindToSprite[Number(newKind)])

    finishEditHandle()
  }

  const options =
    objectsKind.map(kind => ({ name: objectIdToName[kind], value: `${kind}` }))

  return (
    <Dropdown
      name="selectKind"
      onChange={e => updateKind(e.target.value)}
      options={options}
      value={`${currentKind}`}
    />
  )
}

ToggleDropdownKind.propTypes = {
  currentKind: PropTypes.number.isRequired,
  finishEditHandle: PropTypes.func,
  isEditing: PropTypes.bool.isRequired,
  objectIndex: PropTypes.number.isRequired,
}

ToggleDropdownKind.defaultProps = {
  finishEditHandle: () => {},
}

const Kind = ({ objectIndex, objectKind }) => {
  const [isEditingKind, setIsEditingKind] = useState(false)

  const icon = (
    isEditingKind ?
      <IconClose width={16} height={16} /> :
      <IconEdit width={16} height={16} />
  )

  return (
    <span className={style.kind}>
      <strong>Kind:</strong>

      <ToggleDropdownKind
        currentKind={objectKind}
        finishEditHandle={() => setIsEditingKind(false)}
        isEditing={isEditingKind}
        objectIndex={objectIndex}
      />

      <Button
        circle
        fill="clean"
        icon={icon}
        onClick={() => setIsEditingKind(!isEditingKind)}
      />
    </span>
  )
}

Kind.propTypes = {
  objectIndex: PropTypes.number.isRequired,
  objectKind: PropTypes.number.isRequired,
}

export default Kind
