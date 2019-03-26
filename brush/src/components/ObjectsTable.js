import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'former-kit'
import scissors from 'scissors'
import { defaultTo } from 'ramda'
import VisionContext from '../context/VisionContext'

const ObjectsTable = ({ onRowClickHandler }) => {
  const { oam } = useContext(VisionContext).vision

  const rows = oam
    .map(oamEntry => oamEntry.data)
    .map(({
      kind,
      xStage1,
      xStage2,
      xStage3,
      yStage1,
      yStage2,
      yStage3,
    }) => {
      const name = defaultTo('unknown', scissors.oamIdToName[kind])

      return [
        {
          Name: name,
          Position: `Stage 1 X ${xStage1} Y ${yStage1}`,
          x: xStage1,
          y: yStage1,
        },
        {
          Name: name,
          Position: `Stage 2 X ${xStage2} Y ${yStage2}`,
          x: xStage2,
          y: yStage2,
        },
        {
          Name: name,
          Position: `Stage 3 X ${xStage3} Y ${yStage3}`,
          x: xStage3,
          y: yStage3,
        },
      ]
    })
    .flat()

  const onRowClickHandlerWrapper = (index) => {
    const object = rows[index]
    onRowClickHandler([object.x, object.y])
  }

  return (
    <Table
      columns={[
        { accessor: ['Name'], title: 'Name' },
        { accessor: ['Position'], title: 'Position' },
      ]}
      rows={rows}
      emptyMessage="No objects"
      onRowClick={onRowClickHandlerWrapper}
    />
  )
}

ObjectsTable.propTypes = {
  onRowClickHandler: PropTypes.func,
}

ObjectsTable.defaultProps = {
  onRowClickHandler: () => {},
}

export default ObjectsTable
