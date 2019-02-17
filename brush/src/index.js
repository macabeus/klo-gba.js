import React from 'react'
import ReactDOM from 'react-dom'
import Map from './map/map'
import getVision from './get-vision'

const {
  infos: {
    tilemap: {
      height,
      width,
    },
  },
  tilemap,
} = getVision(1, 1)

ReactDOM.render(
  <Map height={height} width={width} tilemap={tilemap} />,
  document.getElementById('app')
)
