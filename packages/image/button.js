import React from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const ImageButton = ({
  src,
  blur = '2px',
  scale = 1.035,
  brightness = 1,
  children,
  ...props
}) => {
  return (
    <Button sx={{ overflow: 'hidden', p: 0 }} fullWidth {...props}>
      <Box
        sx={{
          width: '100%',
          height: 'auto',
          transition: 'transform 400ms, filter 400ms',
          filter: `brightness(${brightness})`,
          '&:hover': {
            filter: `blur(${blur}) brightness(${brightness})`,
            transform: `scale(${scale})`
          }
        }}
      >
        <img src={src} width="100%" height="100%" />
      </Box>
      <Box
        position="absolute"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {children}
      </Box>
    </Button>
  )
}

export default ImageButton
