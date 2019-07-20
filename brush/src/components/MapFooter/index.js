import React from 'react'
import PropTypes from 'prop-types'

const MapFooter = ({ informations }) => {
  if (informations === null) {
    return (
      <div>Click at a point to show its informations here</div>
    )
  }

  const { message, x, y } = informations

  return (
    <div>{message} [{x}, {y}]</div>
  )
}

MapFooter.propTypes = {
  informations: PropTypes.shape({
    message: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
}

MapFooter.defaultProps = {
  informations: null,
}

export default MapFooter
