import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { range } from 'ramda'
import PointObject from '../Point/PointObject'
import ObjectGraphic from './ObjectGraphic'
import { renderObjectsTextures } from '../../../pixiHelpers/renderTextures'

const ObjectsLayer = ({
  pixiRenderer,
  setSelectedObject,
  setSelectedPointInfos,
  totalStages,
  updateObjectsDiffMap,
  world,
  index,
  vision,
}) => {
  const {
    globalObjectsSprites,
    localObjectsSprites,
    objects,
    objectsPaletteIndexes,
    visionObjectsPalettes,
  } = vision

  // It's a cache to avoid needing to create a texture for each object, and for each React re-render
  // It works because each object kind (hopefully) always has the same sprite/palette/relative x/relative y
  const makeMapObjectKindToTexture = () =>
    objects
      .map(objectEntry => objectEntry.data)
      .reduce((acc, objectData, objectIndex) => {
        let sprites

        if (
          objectData.kind === 0x76
          || objectData.kind === 0x77
          || objectData.kind === 0x78
          || objectData.kind === 0x2E
        ) {
          sprites = localObjectsSprites[objectIndex + 1]
        }

        if (globalObjectsSprites[objectData.kind]) {
          sprites = globalObjectsSprites[objectData.kind]
        }

        if (sprites === undefined) {
          return acc
        }

        const { paletteIndex } = objectsPaletteIndexes[objectIndex + 1]

        acc[objectData.kind] = renderObjectsTextures(
          pixiRenderer,
          sprites,
          visionObjectsPalettes[paletteIndex]
        )

        return acc
      }, {})

  const makeMapObjectKindToRelativePositions = () =>
    objects
      .map(objectEntry => objectEntry.data)
      .reduce((acc, objectData, objectIndex) => {
        acc[objectData.kind] = {
          x: objectsPaletteIndexes[objectIndex + 1].relativeX,
          y: objectsPaletteIndexes[objectIndex + 1].relativeY,
        }

        return acc
      }, {})

  const mapObjectKindToTexture = makeMapObjectKindToTexture()
  const mapObjectKindToRelativePositions =
    makeMapObjectKindToRelativePositions()

  const objectsList = objects
    .map(objectEntry => objectEntry.data)
    .map((objectData, objectIndex) => {
      const siblingsObjects = []

      return range(1, totalStages + 1).map((i) => {
        const x = objectData[`xStage${i}`]
        const y = objectData[`yStage${i}`]

        if (mapObjectKindToTexture[objectData.kind]) {
          return (
            <ObjectGraphic
              siblingsObjects={siblingsObjects}
              visionObjectsPalettes={visionObjectsPalettes}
              onFinishDragAndDrop={updateObjectsDiffMap}
              objectIndex={objectIndex}
              stage={i}
              baseX={x}
              baseY={y}
              initialObjectKind={objectData.kind}
              mapObjectKindToTextures={mapObjectKindToTexture}
              mapObjectKindToRelativePositions={
                mapObjectKindToRelativePositions
              }
              onObjectSelected={setSelectedObject}
              key={`${world} ${index} ${x} ${y} ${i}`}
            />
          )
        }

        // TODO: PointObject is legacy and should be removed
        // When there is no Sprite for an object, should usa a fallback sprite
        return (
          <PointObject
            onFinishDragAndDrop={updateObjectsDiffMap}
            key={`${world} ${index} ${x} ${y} ${i}`}
            objectId={objectData.kind}
            objectIndex={objectIndex}
            stage={i}
            onClickHandle={setSelectedObject}
            showPointInfosHandle={setSelectedPointInfos}
            x={x}
            y={y}
          />
        )
      })
    })

  return (
    <>
      {objectsList}
    </>
  )
}

ObjectsLayer.propTypes = {
  pixiRenderer: PropTypes.object.isRequired,
  setSelectedObject: PropTypes.func,
  setSelectedPointInfos: PropTypes.func,
  totalStages: PropTypes.number.isRequired,
  updateObjectsDiffMap: PropTypes.func,
  vision: PropTypes.shape({
    globalObjectsSprites: PropTypes.object.isRequired,
    localObjectsSprites: PropTypes.array.isRequired,
    objects: PropTypes.array.isRequired,
    objectsPaletteIndexes: PropTypes.array.isRequired,
    visionObjectsPalettes: PropTypes.array.isRequired,
  }).isRequired,
}

ObjectsLayer.defaultProps = {
  setSelectedObject: () => {},
  setSelectedPointInfos: () => {},
  updateObjectsDiffMap: () => {},
}

const memoReuseObjectsLayer = (Component) => memo(
  Component,
  (previous, next) =>
    (previous.world === next.world)
    && (previous.index === next.index)
)

export default memoReuseObjectsLayer(ObjectsLayer)
