import React from 'react'
import {
  Sidebar,
  SidebarLinks,
} from 'former-kit'
import SidebarLogo from './SidebarLogo'
import SelectVision from './SelectVision'
import ChangeRom from './ChangeRom'

const KloGbaSidebar = () => (
  <Sidebar>
    <SidebarLogo />

    <SidebarLinks>
      <SelectVision />

      <ChangeRom />
    </SidebarLinks>
  </Sidebar>
)

export default KloGbaSidebar
