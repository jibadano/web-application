import React from 'react'

import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import CircularProgress from '@mui/material/CircularProgress'

const FloatingButton = ({ children, loading, ...props }) => (
  <Box position="fixed" right={0} bottom={0} p={4}>
    <Fab size="small" color="primary" disabled={loading} {...props}>
      {loading ? <CircularProgress /> : children}
    </Fab>
  </Box>
)

export default FloatingButton
