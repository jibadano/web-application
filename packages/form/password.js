import React from 'react'
import get from 'lodash/get'
import TextField from '@mui/material/TextField'
import VisibilityOn from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'

export default ({
  type = 'password',
  id,
  touched,
  errors,
  values,
  children,
  handleChange,
  handleBlur,
  helpText,
  disabled
}) => {
  const [displayType, setDisplayType] = React.useState(type)

  return (
    <TextField
      id={id}
      disabled={disabled}
      type={displayType}
      value={get(values, id)}
      error={Boolean(get(touched, id) && get(errors, id))}
      helperText={(get(touched, id) && get(errors, id)) || helpText}
      variant="outlined"
      fullWidth
      onChange={handleChange}
      onBlur={handleBlur}
      label={children}
      InputLabelProps={{
        shrink: type == 'date' ? true : undefined
      }}
      InputProps={{
        endAdornment:
          displayType == 'password' ? (
            <IconButton
              disabled={disabled}
              size="small"
              tabIndex={32}
              onClick={() => setDisplayType('text')}
            >
              <VisibilityOn />
            </IconButton>
          ) : (
            <IconButton
              size="small"
              disabled={disabled}
              tabIndex={32}
              onClick={() => setDisplayType('password')}
            >
              <VisibilityOff />
            </IconButton>
          )
      }}
    />
  )
}
