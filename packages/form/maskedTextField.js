import React from 'react'
import get from 'lodash/get'
import TextField from '@mui/material/TextField'

import MaskedInput from 'react-text-mask'
function TextMaskCustom(props) {
  const { inputRef, ...other } = props
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null)
      }}
    />
  )
}

export default ({
  type,
  id,
  touched,
  errors,
  values,
  children,
  handleChange,
  handleBlur,
  helpText,
  disabled,
  ...props
}) => {
  return (
    <TextField
      id={id}
      type={type}
      disabled={disabled}
      value={get(values, id)}
      error={Boolean(get(touched, id) && get(errors, id))}
      helperText={
        Boolean(get(touched, id) && get(errors, id))
          ? get(errors, id)
          : helpText
      }
      variant="outlined"
      fullWidth
      onChange={handleChange}
      onBlur={handleBlur}
      label={children}
      inputProps={props}
      InputProps={{
        inputComponent: TextMaskCustom
      }}
      {...props}
    />
  )
}
