import React from 'react'
import { Box, Paper, Typography } from '@mui/material'

const CardMetric = ({ title, value, icon, desc }) => (
  <Box component={Paper} sx={{ p: 2, display: 'flex', height: '100%' }}>
    <Box sx={{ flexGrow: 1, display: 'grid' }}>
      <Typography color="textSecondary" gutterBottom variant="h6">
        {title}
      </Typography>
      <Typography color="textPrimary" variant="h3">
        {value}
      </Typography>
      <Box>{desc}</Box>
    </Box>
    {icon}
  </Box>
)

export default CardMetric
