import React from 'react'

import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

const CardInfo = ({ title, children, actions }) => {
  return (
    <Box component={Paper}>
      <Box sx={{ p: 2 }}>
        <Typography color="textSecondary" gutterBottom variant="h6">
          {title}
        </Typography>
        <Typography color="textPrimary" variant="caption">
          {children}
        </Typography>
      </Box>
      {actions && (
        <Box sx={{ backgroundColor: 'grey.100', p: 2 }}>{actions}</Box>
      )}
    </Box>
  )
}

export default CardInfo
