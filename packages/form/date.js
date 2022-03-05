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
  ...props
}) => (
  <TextField
    id={id}
    fullWidth
    variant="outlined"
    type="date"
    value={get(values, id)}
    error={Boolean(get(touched, id) && get(errors, id))}
    helperText={
      Boolean(get(touched, id) && get(errors, id)) ? get(errors, id) : helpText
    }
    onChange={handleChange}
    onBlur={handleBlur}
    label={children}
    InputLabelProps={{
      shrink: true
    }}
    {...props}
  />
)
