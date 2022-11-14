import React from 'react'
import get from 'lodash/get'
import TextField from '@mui/material/TextField'

export default ({
  id,
  touched,
  errors,
  values,
  children,
  handleChange,
  handleBlur,
  helpText,
  disabled,
  currencyId
}) => (
  <div style={{ display: 'flex' }}>
    <TextField
      id={currencyId}
      disabled
      value={get(values, currencyId)}
      variant="outlined"
      onChange={handleChange}
      onBlur={handleBlur}
      label={children}
    />
    <TextField
      id={id}
      fullWidth
      type="number"
      disabled={disabled}
      value={get(values, id)}
      error={Boolean(get(touched, id) && get(errors, id))}
      helperText={(get(touched, id) && get(errors, id)) || helpText}
      variant="outlined"
      onChange={handleChange}
      onBlur={handleBlur}
    />
  </div>
)
