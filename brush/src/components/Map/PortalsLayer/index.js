import React from 'react'
import PropTypes from 'prop-types'
import { Layer } from 'react-konva'
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
    <Layer>
      {portalList}
    </Layer>
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
