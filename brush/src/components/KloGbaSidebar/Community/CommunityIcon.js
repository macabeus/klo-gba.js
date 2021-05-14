import React from 'react'
import PropTypes from 'prop-types'
import style from './style.css'

const CommunityIcon = ({ imageUrl, link, name }) => (
  <a
    tabIndex="0"
    href={link}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      className={style.icon}
      alt={`${name} icon`}
      src={imageUrl}
    />
  </a>
)

CommunityIcon.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default CommunityIcon
