import React from 'react'
import get from 'lodash/get'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'

export default ({
  id,
  values,
  children,
  handleChange,
  options = [],
  ...props
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel {...props} shrink={Boolean(get(values, id))} htmlFor={id}>
        {children}
      </InputLabel>
      <Select
        native
        label={children}
        id={id}
        value={get(values, id)}
        onChange={handleChange}
        InputLabelProps={{
          shrink: Boolean(get(values, id))
        }}
        {...props}
      >
        {options.map(({ name, value }) => (
          <option key={value} value={value || ''}>
            {name}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}
