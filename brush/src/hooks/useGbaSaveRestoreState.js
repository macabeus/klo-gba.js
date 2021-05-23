import { useContext, useEffect, useState } from 'react'
import { GbaContext } from 'react-gbajs'

const keyCodeQ = 81
const keyCodeW = 87

const keyCodeToAction = ({
  [keyCodeQ]: 'save',
  [keyCodeW]: 'restore',
})

const useGbaSaveRestoreState = () => {
  const [savedState, setSavedState] = useState()
  const {
    saveState,
    updateState,
  } = useContext(GbaContext)

  useEffect(() => {
    const switchHandle = ({ keyCode }) => {
      const action = keyCodeToAction[keyCode]
      if (action === 'save') {
        setSavedState(saveState())
        return
      }

      if (action === 'restore' && savedState !== undefined) {
        updateState({ restoreState: savedState })
      }
    }

    window.addEventListener('keydown', switchHandle)
    window.addEventListener('keyup', switchHandle)

    return () => {
      window.removeEventListener('keydown', switchHandle)
      window.removeEventListener('keyup', switchHandle)
    }
  }, [savedState, updateState, saveState])
}

export default useGbaSaveRestoreState
