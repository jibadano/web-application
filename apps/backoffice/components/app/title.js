import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const Title = ({ children, overtitle, subtitle, actions }) => (
  <Box
    display={{ xs: 'block', md: 'flex' }}
    justifyContent="flex-end"
    alignItems="flex-end"
  >
    <Box flexGrow={1}>
      <Typography variant="button" gutterBottom color="textSecondary">
        {overtitle}
      </Typography>
      <Typography variant="h4">{children}</Typography>
      <Typography
        style={{ paddingTop: 5 }}
        variant="body1"
        color="textSecondary"
      >
        {subtitle}
      </Typography>
    </Box>
    <Box pt={2}>{actions}</Box>
  </Box>
)

export default Title
