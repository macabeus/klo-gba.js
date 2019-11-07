import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'former-kit'

const ClearHighlightCoordinates = ({ setHighlightCoordinates }) => (
  <Button
    relevance="low"
    fill="clean"
    onClick={() => setHighlightCoordinates([-1, -1])}
  >
    Clear highlight coordinates
  </Button>
)

ClearHighlightCoordinates.propTypes = {
  setHighlightCoordinates: PropTypes.func,
}

ClearHighlightCoordinates.defaultProps = {
  setHighlightCoordinates: () => {},
}

export default ClearHighlightCoordinates
