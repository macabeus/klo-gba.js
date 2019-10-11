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

const KloGbaSidebar = () => (
  <Sidebar>
    <SidebarLogo />

    <SidebarLinks>
      <SelectVision />

      <DisplayMapOptions />

      <ChangeRom />

      <Community />
    </SidebarLinks>
  </Sidebar>
)

export default KloGbaSidebar
