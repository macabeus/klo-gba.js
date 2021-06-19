import React from 'react'
import PropTypes from 'prop-types'
import PortalPoint from '../Point/PortalPoint'

const PortalsLayer = ({ vision }) => {
  const { portals } = vision

  const portalList = portals
    .map(portalEntry => portalEntry.data)
    .map((portalData, index) => (
      <PortalPoint
        // For some reason, there are visions that has two portals on the same place
        // eslint-disable-next-line react/no-array-index-key
        key={`${portalData.x} ${portalData.y} ${index}`}
        x={portalData.x}
        y={portalData.y}
      />
    ))

  return (
    <>
      {portalList}
    </>
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
