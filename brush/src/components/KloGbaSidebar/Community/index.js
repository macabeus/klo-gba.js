import React, { useContext } from 'react'
import discordIcon from '../../../../assets/discord-icon.png'
import gitHubIcon from '../../../../assets/github-icon.png'
import mediumIcon from '../../../../assets/medium-icon.png'
import twitterIcon from '../../../../assets/twitter-icon.png'
import ROMContext from '../../../context/ROMContext'
import CommunityIcon from './CommunityIcon'
import style from './style.css'

const Community = () => {
  const { romBufferStatus } = useContext(ROMContext)

  const isShowingInputModal = (romBufferStatus !== 'loaded')

  return (
    <div className={`${style.container} ${isShowingInputModal ? style.iconWhenModalIsPresent : ''}`}>
      <CommunityIcon
        name="discord"
        imageUrl={discordIcon}
        link="https://disboard.org/server/103975433493581824"
      />

      <CommunityIcon
        name="github"
        imageUrl={gitHubIcon}
        link="https://github.com/macabeus/klo-gba.js"
      />

      <CommunityIcon
        name="medium"
        imageUrl={mediumIcon}
        link="https://medium.com/@bruno.macabeus/reverse-engineering-a-gameboy-advance-game-introduction-ec185bd8e02"
      />

      <CommunityIcon
        name="twitter"
        imageUrl={twitterIcon}
        link="https://twitter.com/bmacabeus"
      />
    </div>
  )
}

export default Community
