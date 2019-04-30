import { useState } from 'react'

const useTool = () => {
  const [{ currentTool, toolsValue }, setToolsStates] = useState({
    currentTool: 'magnifyingGlass',
    toolsValue: {
      brush: null,
      magnifyingGlass: null,
    },
  })

  const updateToolState = (tool, newToolState) => {
    if (newToolState !== undefined) {
      setToolsStates({
        currentTool: tool,
        toolsValue: {
          ...toolsValue,
          [tool]: newToolState,
        },
      })

      return
    }

    setToolsStates({
      currentTool: tool,
      toolsValue,
    })
  }

  return [{
    name: currentTool,
    value: toolsValue[currentTool],
  }, updateToolState]
}

export default useTool
