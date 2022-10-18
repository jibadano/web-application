import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const Loading = () => (
  <Box
    sx={{
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      height: '100%'
    }}
  >
    <CircularProgress size={64} thickness={5} variant="indeterminate" />
  </Box>
)

export default Loading
