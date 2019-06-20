import React from 'react'
import PropTypes from 'prop-types'
import { pipe } from 'ramda'
import tileNameToColor from '../../../constants/tileNameToColor'
import Point from '.'

// This component should be a class because we need to get a ref of each point to set it in globalState
class BucketPointsTile extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tileName: props.tileName,
      tilesOverlay: {},
      tileValue: props.tileValue,
    }

    this.getTileData = this.getTileData.bind(this)
    this.clickHandle = this.clickHandle.bind(this)
    this.paintTile = this.paintTile.bind(this)
  }

  getTileData (paddingY) {
    const { getTileNameById } = this.props
    const { tileName, tilesOverlay } = this.state

    if (tilesOverlay[paddingY] !== undefined) {
      const { tileValue } = tilesOverlay[paddingY]
      return { tileName: getTileNameById(tileValue), tileValue }
    }

    return { tileName, tileValue: this.state.tileValue }
  }

  clickHandle (paddingY) {
    const { x, y } = this.props
    const { tileName, tileValue } = this.getTileData(paddingY)

    const getInformations = () => ({
      message: `Tile ${tileName} (${tileValue})`,
      x,
      y: y + paddingY,
    })

    pipe(getInformations, this.props.showPointInfosHandle)()
  }

  paintTile (newTileValue, paddingY) {
    const {
      getTileNameById, size, x, y,
    } = this.props
    const { tilesOverlay } = this.state

    const newTileName = getTileNameById(newTileValue)

    if (size === 1) {
      // If this bucket has just one tile

      this.setState({
        tileName: newTileName,
        tileValue: newTileValue,
      })

      return
    }

    // If this bucket has many tiles

    const newTileProps = {
      getTileNameById,
      key: `newTile ${newTileValue} padding ${paddingY}`,
      size: 1,
      tileName: newTileName,
      tileValue: newTileValue,
      x,
      y: y + paddingY,
    }

    tilesOverlay[paddingY] = newTileProps

    this.setState({
      tilesOverlay,
    })
  }

  render () {
    const { size, x, y } = this.props
    const { tileName, tilesOverlay } = this.state

    return [
      <Point
        color={`rgba(${tileNameToColor[tileName]})`}
        x={x}
        y={y}
        size={size}
        key="bucket"
      />,
      ...Object.values(tilesOverlay).map(i => [
        <BucketPointsTile {...i} key={`${i.key} background`} tileName="empty" />,
        <BucketPointsTile {...i} />,
      ]),
    ]
  }
}

BucketPointsTile.propTypes = {
  getTileNameById: PropTypes.func.isRequired,
  showPointInfosHandle: PropTypes.func,
  size: PropTypes.number,
  tileName: PropTypes.string.isRequired,
  tileValue: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

BucketPointsTile.defaultProps = {
  showPointInfosHandle: () => {},
  size: 1,
}

export default BucketPointsTile
