import React from 'react'
import {
  Sidebar,
  SidebarLinks,
} from 'former-kit'
import SidebarLogo from './SidebarLogo'
import SelectVision from './SelectVision'
import DisplayMapOptions from './DisplayMapOptions'
import ChangeRom from './ChangeRom'

const KloGbaSidebar = () => (
  <Sidebar>
    <SidebarLogo />

    <SidebarLinks>
      <SelectVision />

      <DisplayMapOptions />

      <ChangeRom />
    </SidebarLinks>
  </Sidebar>
)

export default KloGbaSidebar
