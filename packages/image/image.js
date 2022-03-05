import React from 'react'
import Box from '@mui/material/Box'

const Image = ({ src, fullWidth, ...props }) => {
  return (
    <Box
      display="flex"
      overflow="hidden"
      alignItems="center"
      justifyContent="center"
      height={fullWidth ? 'auto' : '100%'}
      width={fullWidth ? '100%' : 'auto'}
      maxHeight="80vh"
      {...props}
    >
      <img
        src={src}
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxHeight: fullWidth ? null : '80vh'
        }}
        width="100%"
        height="auto"
      />
    </Box>
  )
}

export default Image
