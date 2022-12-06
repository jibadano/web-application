import React from 'react'

import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import InfoIcon from '@mui/icons-material/Info'
const CardInfo = ({ title, children, actions }) => {
  return (
    <Box component={Paper} sx={{ overflow: 'hidden' }}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex' }}>
          <InfoIcon fontSize="large" />
          <Box sx={{ ml: 1, pt: 0.5 }}>
            <Typography color="textSecondary" gutterBottom variant="h5">
              {title}
            </Typography>
            <Typography color="textPrimary" variant="body2">
              {children}
            </Typography>
          </Box>
        </Box>
      </Box>
      {actions && (
        <Box sx={{ backgroundColor: 'grey.100', p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {actions}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default CardInfo
