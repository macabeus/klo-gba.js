import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as PIXI from 'pixi.js'
import { values, forEach } from 'ramda'
import { Graphics } from '@inlet/react-pixi'

const ObjectGraphic = ({
  baseX,
  baseY,
  initialObjectKind,
  mapObjectKindToRelativePositions,
  mapObjectKindToTextures,
  objectIndex,
  onFinishDragAndDrop,
  onObjectSelected,
  siblingsObjects,
  stage,
}) => {
  const [status, setStatus] = useState('normal')
  const [parent, setParent] = useState(null)
  const [objX, setX] = useState(baseX)
  const [objY, setY] = useState(baseY)
  const [objectKind, setObjectKind] = useState(initialObjectKind)

  useEffect(() => {
    // There is no simple way to connect siblings components,
    // so let's do a param-reassign as a workaround to do it without needing to refac everything
    // eslint-disable-next-line no-param-reassign
    siblingsObjects[stage] = { setObjectKind }
  }, [siblingsObjects, stage, setObjectKind])

  const updateObjectsKind = (newKind) =>
    values(siblingsObjects)
    |> forEach((siblingObject) => siblingObject.setObjectKind(newKind))

  const relativePositions = mapObjectKindToRelativePositions[objectKind]
  const tileTextures = mapObjectKindToTextures[objectKind]

  const lineLength = (tileTextures.length > 1) ?
    Math.log2(tileTextures.length) :
    1

  const tileIndexToCoordenates = (tileIndex) => {
    const tileX = tileIndex % lineLength
    const tileY = (Math.floor(tileIndex / lineLength))

    return [tileX * 8, tileY * 8]
  }

  const saveNewObjectPosition = (newX, newY) => {
    onFinishDragAndDrop(objectIndex, `xStage${stage}`, newX)
    onFinishDragAndDrop(objectIndex, `yStage${stage}`, newY)
  }

  const finishedDragAndDrop = () => {
    if (status === 'dragging') {
      saveNewObjectPosition(objX, objY)
      setStatus('normal')
    }
  }

  return (
    <Graphics
      interactive
      draw={(g) => {
        g.removeChildren()
        if (g.parent !== parent) {
          setParent(g.parent)
          return
        }

        for (let tileIndex = 0; tileIndex < tileTextures.length; tileIndex += 1) {
          const [tileX, tileY] = tileIndexToCoordenates(tileIndex)

          const texture = tileTextures[tileIndex]
          const sprite = new PIXI.Sprite(texture)

          if (status !== 'normal') {
            const filter = new PIXI.filters.ColorMatrixFilter()

            status === 'dragging'
              ? filter.brightness(0.8)
              : filter.brightness(1.2)

            sprite.filters = [filter]
          }

          sprite.x = objX + tileX + relativePositions.x
          sprite.y = objY + tileY + relativePositions.y

          g.addChild(sprite)
        }
      }}
      mouseover={() => {
        if (status === 'normal') {
          setStatus('over')
        }
      }}
      mousedown={() => {
        if (status !== 'dragging') {
          onObjectSelected({
            handleObjectChange: (event) => {
              if (event.action === 'newKind') {
                updateObjectsKind(event.kind)
                return
              }

              console.warn('Unknown change on object:', event)
            },
            index: objectIndex,
          })
          setStatus('dragging')
        }
      }}
      mouseout={() => {
        if (status === 'over') {
          setStatus('normal')
        }
      }}
      mousemove={(event) => {
        if (status !== 'dragging') return

        const newPosition = event.data.getLocalPosition(parent)

        setX(newPosition.x)
        setY(newPosition.y)
      }}
      mouseupoutside={finishedDragAndDrop}
      pointerup={finishedDragAndDrop}
    />
  )
}

ObjectGraphic.propTypes = {
  baseX: PropTypes.number.isRequired,
  baseY: PropTypes.number.isRequired,
  initialObjectKind: PropTypes.number.isRequired,
  mapObjectKindToRelativePositions: PropTypes.object.isRequired,
  mapObjectKindToTextures: PropTypes.object.isRequired,
  objectIndex: PropTypes.number.isRequired,
  onFinishDragAndDrop: PropTypes.func.isRequired,
  onObjectSelected: PropTypes.func.isRequired,
  siblingsObjects: PropTypes.array.isRequired,
  stage: PropTypes.number.isRequired,
}

export default ObjectGraphic
