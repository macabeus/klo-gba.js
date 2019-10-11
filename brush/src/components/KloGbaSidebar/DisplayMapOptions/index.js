import React, { useContext } from 'react'
import {
  Checkbox,
  SidebarContent,
  SidebarLink,
} from 'former-kit'
import DisplayMapOptionsContext from '../../../context/DisplayMapOptionsContext'
import style from './style.css'

const DisplayMapOptions = () => {
  const { options, setOptions } = useContext(DisplayMapOptionsContext)

  return (
    <SidebarLink title="Display map options">
      <SidebarContent className={style.content}>
        <Checkbox
          label="Show grid"
          name="optShowGrid"
          value={`${options.showGrid}`}
          checked={options.showGrid}
          onChange={() => setOptions.setShowGrid(!options.showGrid)}
        />
        <Checkbox
          label="Show OAM"
          name="optShowOAM"
          value={`${options.showOAM}`}
          checked={options.showOAM}
          onChange={() => setOptions.setShowOAM(!options.showOAM)}
        />
        <Checkbox
          label="Show Portals"
          name="optShowPortals"
          value={`${options.showPortals}`}
          checked={options.showPortals}
          onChange={() => setOptions.setShowPortals(!options.showPortals)}
        />
      </SidebarContent>
    </SidebarLink>
  )
}

export default DisplayMapOptions
