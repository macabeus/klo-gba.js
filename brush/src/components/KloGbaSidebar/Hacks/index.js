import React, { useContext } from 'react'
import {
  Checkbox,
  SidebarContent,
  SidebarLink,
} from 'former-kit'
import { GbaContext } from 'react-gbajs'
import { keys, includes } from 'ramda'
import style from './style.css'

const Hacks = () => {
  const {
    addFreezeAddress,
    frozenAddresses,
    removeFreezeAddress,
  } = useContext(GbaContext)

  const infiniteHeartsActived =
    keys(frozenAddresses)
    |> includes('21024')

  const infiniteLivesActived =
    keys(frozenAddresses)
    |> includes('21100')

  return (
    <SidebarLink title="Hacks">
      <SidebarContent className={style.content}>
        <Checkbox
          label="Infinite Hearts"
          name="optInfiniteHearts"
          value="infiniteHearts"
          checked={infiniteHeartsActived}
          onChange={() => {
            if (infiniteHeartsActived) {
              removeFreezeAddress(21024)
              return
            }

            addFreezeAddress({ address: 21024, size: 8, value: 3 })
          }}
        />

        <Checkbox
          label="Infinite Lives"
          name="optInfiniteLives"
          value="infiniteLives"
          checked={infiniteLivesActived}
          onChange={() => {
            if (infiniteLivesActived) {
              removeFreezeAddress(21100)
              return
            }

            addFreezeAddress({ address: 21100, size: 8, value: 99 })
          }}
        />
      </SidebarContent>
    </SidebarLink>
  )
}

export default Hacks
