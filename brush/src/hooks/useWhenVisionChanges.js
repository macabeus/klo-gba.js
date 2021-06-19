import { useContext, useEffect } from 'react'
import VisionContext from '../context/VisionContext'

const useWhenVisionChanges = (callback) => {
  const { visionIndex, visionWorld } = useContext(VisionContext)

  // eslint-disable-next-line
  useEffect(callback, [visionIndex, visionWorld])
}

export default useWhenVisionChanges
