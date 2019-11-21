import React from 'react'
import KlonoaWSit from '../../../assets/KlonoaWSit.svg'
import style from './style.css'

const MapEmptyState = () => (
  <span className={style.container}>
    <KlonoaWSit height={250} />
    <h2><strong>No vision selected!</strong></h2>
    <h3>{'Please, select one at the left bar and let\'s paint an amazing map ~~'}</h3>
    <p>
      Hey, a nice tip: use the following keys to switch between tools<br />
      <strong>n → </strong>inspector;{' '}
      <strong>b → </strong>brush;{' '}
      <strong>i → </strong>eyedropper;{' '}
      <strong>e → </strong>eraser
    </p>
  </span>
)

export default MapEmptyState
