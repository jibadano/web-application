import React from 'react'
import get from 'lodash/get'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import { ChromePicker } from 'react-color'
import Typography from '@mui/material/Typography'

export default ({ id, values, children, handleChange, style }) => {
  const [open, setOpen] = React.useState(false)
  return (
    <Box
      display="flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Box mx={2} display="flex" alignItems="center">
        <Typography>{children}</Typography>
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
      <Fade in={open}>
        <div
          style={{
            position: 'absolute',
            marginLeft: '-62px',
            zIndex: 9999
          }}
        >
          <ChromePicker
            disableAlpha
            color={get(values, id)}
            onChange={({ hex }) => handleChange({ target: { id, value: hex } })}
          />
        </div>
      </Fade>
    </Box>
  )
}
