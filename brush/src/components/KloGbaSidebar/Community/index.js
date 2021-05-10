import React from 'react'
import {
  SidebarLink,
} from 'former-kit'

const Community = () => (
  <SidebarLink title="Community">
    <SidebarLink
      title="Discord"
      onClick={() => window.open('https://disboard.org/server/103975433493581824')}
    />
    <SidebarLink
      title="Medium Posts"
      onClick={() => window.open('https://medium.com/@bruno.macabeus/reverse-engineering-a-gameboy-advance-game-introduction-ec185bd8e02')}
    />
    <SidebarLink
      title="GitHub"
      onClick={() => window.open('https://github.com/macabeus/klo-gba.js')}
    />
  </SidebarLink>
)

export default Community
