import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Pagination } from 'former-kit'
import { zoomValues, defaultZoomIndex } from '../../../constants/zoomValues'
import style from './style.css'

const ZoomSelector = ({ onSelectorChange }) => {
  const [index, setIndex] = useState(defaultZoomIndex + 1)

  return (
    <div className={style.zoomSelector}>
      <Pagination
        currentPage={index}
        totalPages={zoomValues.length}
        onPageChange={(newIndex) => {
          setIndex(newIndex)
          onSelectorChange(zoomValues[newIndex - 1])
        }}
      />
    </div>
  )
}

ZoomSelector.propTypes = {
  onSelectorChange: PropTypes.func,
}

ZoomSelector.defaultProps = {
  onSelectorChange: () => {},
}

export default ZoomSelector
