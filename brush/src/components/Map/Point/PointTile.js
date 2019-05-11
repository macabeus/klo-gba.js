import React from 'react'
import PropTypes from 'prop-types'
import { pipe } from 'ramda'
import tileNameToColor from '../../../constants/tileNameToColor'
import Point from '.'

// This component should be a class because we need to get a ref of each point to set it in globalState
class PointTile extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tileName: props.tileName,
      tileValue: props.tileValue,
    }

    this.clickHandle = this.clickHandle.bind(this)
    this.changeTile = this.changeTile.bind(this)
  }

  clickHandle () {
    const { x, y } = this.props
    const { tileName, tileValue } = this.state

    const getInformations = () => ({
      message: `Tile ${tileName} (${tileValue})`,
      x,
      y,
    })

    pipe(getInformations, this.props.showPointInfosHandle)()
  }

  changeTile (newTileValue) {
    const { getTileNameById } = this.props

    const newTileName = getTileNameById(newTileValue)

    this.setState({
      tileName: newTileName,
      tileValue: newTileValue,
    })
  }

  render () {
    const { x, y } = this.props
    const { tileName } = this.state

    return (<Point
      color={`rgba(${tileNameToColor[tileName]})`}
      x={x}
      y={y}
    />)
  }
}

PointTile.propTypes = {
  getTileNameById: PropTypes.func.isRequired,
  showPointInfosHandle: PropTypes.func,
  tileName: PropTypes.string.isRequired,
  tileValue: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

PointTile.defaultProps = {
  showPointInfosHandle: () => {},
}

export default PointTile
