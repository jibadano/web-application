import React from 'react'
import get from 'lodash/get'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
export default ({ id, values, children, handleChange }) => (
  <FormControlLabel
    control={
      <Checkbox
        id={id}
        onChange={handleChange}
        checked={get(values, id)}
        color="primary"
      />
    }
    label={children}
  />
)
