import React from 'react'
import get from 'lodash/get'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'

export default ({ id, values, children, handleChange }) => (
  <FormControlLabel
    control={
      <Switch
        id={id}
        checked={get(values, id)}
        onChange={handleChange}
        value={id}
      />
    }
    label={children}
  />
)
