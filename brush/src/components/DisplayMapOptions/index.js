import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Checkbox,
  Popover,
  PopoverContent,
} from 'former-kit'

const DisplayMapOptions = ({
  onChangeOptShowGrid,
  onChangeOptShowOAM,
  onChangeOptShowPortals,
  optShowGrid,
  optShowOAM,
  optShowPortals,
}) => (
  <Popover
    content={
      <PopoverContent>
        <Fragment>
          <Checkbox
            label="Show grid"
            name="optShowGrid"
            value={`${optShowGrid}`}
            checked={optShowGrid}
            onChange={() => onChangeOptShowGrid(!optShowGrid)}
          />
          <Checkbox
            label="Show OAM"
            name="optShowOAM"
            value={`${optShowOAM}`}
            checked={optShowOAM}
            onChange={() => onChangeOptShowOAM(!optShowOAM)}
          />
          <Checkbox
            label="Show Portals"
            name="optShowPortals"
            value={`${optShowPortals}`}
            checked={optShowPortals}
            onChange={() => onChangeOptShowPortals(!optShowPortals)}
          />
        </Fragment>
      </PopoverContent>
    }
  >
    <Button>Display map options</Button>
  </Popover>
)

DisplayMapOptions.propTypes = {
  onChangeOptShowGrid: PropTypes.func.isRequired,
  onChangeOptShowOAM: PropTypes.func.isRequired,
  onChangeOptShowPortals: PropTypes.func.isRequired,
  optShowGrid: PropTypes.bool.isRequired,
  optShowOAM: PropTypes.bool.isRequired,
  optShowPortals: PropTypes.bool.isRequired,
}

export default DisplayMapOptions
