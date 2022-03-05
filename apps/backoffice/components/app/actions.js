import React from 'react'

import Box from '@mui/material/Box'
import ActionsSet from './actionsSet'
const Actions = ({ optional, left, right }) => (
  <Box width="100%">
    <ActionsSet fullWidth set={optional} />
    <Box display={{ xs: 'block', md: 'flex' }}>
      <Box flexGrow={1}>
        <ActionsSet fullWidth set={left} />
      </Box>
      <Box>
        <ActionsSet fullWidth set={right} />
      </Box>
    </Box>
  </Box>
)

export default Actions
