import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const DataListItem = ({ label, primary, secondary }) => (
  <Box display={{ xs: 'block', md: 'flex' }} alignItems="center" width="100%">
    <Box p={1} width={{ xs: '100%', md: '40%' }}>
      <Typography
        variant="body2"
        style={{ fontWeight: 'bold', verticalAlign: 'center' }}
        noWrap
      >
        {label}
      </Typography>
    </Box>
    <Box p={1} style={{ width: '100%' }}>
      <Typography align="left" color="textSecondary">
        {primary}
      </Typography>
    </Box>
    <Typography align="left" color="textSecondary" variant="caption">
      {secondary}
    </Typography>
  </Box>
)

export default DataListItem
