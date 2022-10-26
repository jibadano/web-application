import React from 'react'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'

const Splash = () => (
  <Box
    sx={{
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      height: '100%'
    }}
  >
    <div>
      <Typography variant="h5" gutterBottom>
        Backoffice
      </Typography>
      <LinearProgress variant="indeterminate" />
    </div>
  </Box>
)

export default Splash
