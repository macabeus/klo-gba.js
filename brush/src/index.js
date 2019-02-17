import React from 'react'
import ReactDOM from 'react-dom'
import Map from './map/map'

const tilemap = [1, 0, 0, 1, 0, 1, 1, 0]

ReactDOM.render(
  <Map height={2} width={4} tilemap={tilemap} />,
  document.getElementById('app')
)
