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
  type = 'date',
  ...props
}) => {
  const [state, setState] = React.useState('text')
  return (
    <TextField
      id={id}
      fullWidth
      variant="outlined"
      type={state}
      value={
        state == 'text' && get(values, id)
          ? new Date(get(values, id)).toLocaleDateString()
          : get(values, id)
      }
      error={Boolean(get(touched, id) && get(errors, id))}
      helperText={
        Boolean(get(touched, id) && get(errors, id))
          ? get(errors, id)
          : helpText
      }
      onChange={handleChange}
      label={children}
      InputLabelProps={{
        shrink: Boolean(get(values, id) || state == type)
      }}
      {...props}
      onFocus={() => {
        setState(type)
      }}
      onBlur={() => {
        setState('text')
      }}
    />
  )
}
