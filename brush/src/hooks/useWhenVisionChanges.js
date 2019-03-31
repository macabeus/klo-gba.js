import { useContext, useEffect } from 'react'
import VisionContext from '../context/VisionContext'

const useWhenVisionChanges = (callback) => {
  const { visionIndex, visionWorld } = useContext(VisionContext)

  useEffect(callback, [visionIndex, visionWorld])
}

export default useWhenVisionChanges
