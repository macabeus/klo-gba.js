import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import PortalPoint from '../Point/PortalPoint'

const PortalsLayer = ({ vision }) => {
  const { portals } = vision

  const portalList = portals
    .map(portalEntry => portalEntry.data)
    .map(portalData => (
      <PortalPoint
        key={`${portalData.x} ${portalData.y}`}
        x={portalData.x}
        y={portalData.y}
      />
    ))

  return (
    <Fragment>
      {portalList}
    </Fragment>
  )
}

PortalsLayer.propTypes = {
  vision: PropTypes.shape({
    portals: PropTypes.arrayOf(PropTypes.shape({
      data: PropTypes.object.isRequired,
    })).isRequired,
  }).isRequired,
}

export default PortalsLayer
