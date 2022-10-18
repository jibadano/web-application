import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import config from '@jibadano/config'

const Footer = () => (
  <Box sx={{ py: 3, px: 1 }}>
    <Typography variant="caption" color="text.secondary">
      {config.get('..settings.app.name')} - Backoffice{' '}
      {new Date().getFullYear()}
    </Typography>
  </Box>
)

export default Footer
