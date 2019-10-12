import React, { useContext } from 'react'
import {
  Checkbox,
  SidebarContent,
  SidebarLink,
} from 'former-kit'
import DisplayMapOptionsContext from '../../../context/DisplayMapOptionsContext'
import ZoomSelector from './ZoomSelector'
import style from './style.css'

const DisplayMapOptions = () => {
  const { options, setOptions } = useContext(DisplayMapOptionsContext)

  return (
    <SidebarLink title="Display map options">
      <SidebarContent className={style.content}>
        <ZoomSelector onSelectorChange={setOptions.setZoom} />

        <Checkbox
          label="Show grid"
          name="optShowGrid"
          value={`${options.showGrid}`}
          checked={options.showGrid}
          onChange={() => setOptions.setShowGrid(!options.showGrid)}
        />
        <Checkbox
          label="Show Objects"
          name="optShowObjects"
          value={`${options.showObjects}`}
          checked={options.showObjects}
          onChange={() => setOptions.setShowObjects(!options.showObjects)}
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
