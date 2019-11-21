import { useEffect } from 'react'

const keyCodeB = 66
const keyCodeE = 69
const keyCodeI = 73
const keyCodeN = 78

const keyCodeToTool = ({
  [keyCodeB]: 'brush',
  [keyCodeE]: 'eraser',
  [keyCodeI]: 'eyedropper',
  [keyCodeN]: 'inspector',
})

const useToolKeyboardShortcut = setToolState => useEffect(() => {
  const switchHandle = ({ keyCode }) => {
    const newTool = keyCodeToTool[keyCode]
    if (newTool === undefined) {
      return
    }

    setToolState(newTool)
  }

  window.addEventListener('keydown', switchHandle)
  window.addEventListener('keyup', switchHandle)

  return () => {
    window.removeEventListener('keydown', switchHandle)
    window.removeEventListener('keyup', switchHandle)
  }
}, [setToolState])

export default useToolKeyboardShortcut
