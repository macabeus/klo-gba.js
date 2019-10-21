import { useState } from 'react'

const useForceUpdate = () => {
  const [value, set] = useState(true)
  const forceUpdate = () => set(!value)

  return forceUpdate
}

export default useForceUpdate
