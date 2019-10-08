import React from 'react'
import {
  Sidebar,
  SidebarLinks,
} from 'former-kit'
import SidebarLogo from './SidebarLogo'
import SelectVision from './SelectVision'

const KloGbaSidebar = () => (
  <Sidebar>
    <SidebarLogo />

    <SidebarLinks>
      <SelectVision />
    </SidebarLinks>
  </Sidebar>
)

export default KloGbaSidebar
