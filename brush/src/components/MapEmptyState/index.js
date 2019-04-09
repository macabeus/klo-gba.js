import React from 'react'
import KlonoaWSit from '../../../assets/KlonoaWSit.svg'
import style from './style.css'

const MapEmptyState = () => (
  <span className={style.container}>
    <KlonoaWSit height={250} />
    <h2><strong>No vision selected!</strong></h2>
    <h3>{'Please, select one at the upper left corner and let\'s paint an amazing map ~~'}</h3>
  </span>
)

export default MapEmptyState
