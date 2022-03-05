import React from 'react'
import get from 'lodash/get'
import TextField from '@mui/material/TextField'

const TextArea = ({
  id,
  touched,
  errors,
  values,
  children,
  handleChange,
  handleBlur,
  helpText,
  rows = 3,
  disabled,
  ...props
}) => (
  <TextField
    id={id}
    type="text"
    variant="outlined"
    fullWidth
    value={get(values, id)}
    error={Boolean(get(touched, id) && get(errors, id))}
    helperText={
      Boolean(get(touched, id) && get(errors, id)) ? get(errors, id) : helpText
    }
    onChange={handleChange}
    onBlur={handleBlur}
    label={children}
    rows={rows}
    multiline
    {...props}
  />
)

export default TextArea
