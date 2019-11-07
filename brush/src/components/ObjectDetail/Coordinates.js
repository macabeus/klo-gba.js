import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'former-kit'
import IconTarget from 'emblematic-icons/svg/Target32.svg'
import style from './style.css'

const Coordinates = ({
  setHighlightCoordinates,
  stage,
  x,
  y,
}) => (
  <span className={style.attribute}>
    <strong>Coordenates Stage {stage}:</strong> {x.toFixed(2)} {y.toFixed(2)}

    <Button
      circle
      fill="clean"
      icon={<IconTarget width={16} height={16} />}
      onClick={() => setHighlightCoordinates([x, y])}
    />
  </span>
)

Coordinates.propTypes = {
  setHighlightCoordinates: PropTypes.func,
  stage: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

Coordinates.defaultProps = {
  setHighlightCoordinates: () => {},
}

export default Coordinates
