import React from 'react'
import get from 'lodash/get'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'

export default ({ id, values, children, handleChange, options, ...props }) => {
  const inputLabel = React.useRef(null)

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel shrink={true} ref={inputLabel} htmlFor={id}>
        {children}
      </InputLabel>
      <Select
        fullWidth
        native
        labelWidth={children ? children.length * 8 : 40}
        value={get(values, id)}
        onChange={handleChange}
        inputProps={{
          name: id,
          id
        }}
        {...props}
      >
        {(options || []).map(({ name, value }) => (
          <option key={value || 'undefined'} value={value}>
            {name}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}
