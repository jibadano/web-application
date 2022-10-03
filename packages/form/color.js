import React from 'react'
import get from 'lodash/get'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import { ChromePicker } from 'react-color'
import Typography from '@mui/material/Typography'

export default ({ id, values, children, handleChange, style, disabled }) => {
  const [open, setOpen] = React.useState(false)
  return (
    <Box
      display="flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        <Typography color={disabled && 'text.disabled'}>{children}</Typography>
      </Box>
      <div
        style={
          style || {
            background: get(values, id),
            height: 40,
            width: 40,
            borderRadius: 300,
            border: '3px solid #ddd'
          }
        }
      />
      <Fade in={open && !disabled}>
        <div
          style={{
            position: 'absolute',
            zIndex: 9999
          }}
        >
          <ChromePicker
            styles={{ body: { 'border-radius': '30px' } }}
            disableAlpha
            color={get(values, id)}
            onChange={({ hex }) => handleChange({ target: { id, value: hex } })}
          />
        </div>
      </Fade>
    </Box>
  )
}
