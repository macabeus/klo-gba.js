import React from 'react'
import {
  Sidebar,
  SidebarLinks,
} from 'former-kit'
import SidebarLogo from './SidebarLogo'
import SelectVision from './SelectVision'
import DisplayMapOptions from './DisplayMapOptions'
import ChangeRom from './ChangeRom'
import Community from './Community'
import Hacks from './Hacks'
import style from './style.css'

const KloGbaSidebar = () => (
  <Sidebar>
    <SidebarLogo />

    <SidebarLinks>
      <SelectVision />

      <DisplayMapOptions />

      <Hacks />

      <ChangeRom />
    </SidebarLinks>

    <span className={style.communityContainer}>
      <Community />
    </span>
  </Sidebar>
)

export default KloGbaSidebar
