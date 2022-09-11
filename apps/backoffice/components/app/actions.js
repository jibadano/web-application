import React from 'react'
import Box from '@mui/material/Box'
import ActionsSet from './actionsSet'

const Actions = ({ optional, left, right }) => (
  <Box width="100%">
    <ActionsSet fullWidth set={optional} />
    <Box display={{ xs: 'block', md: 'flex' }} alignItems="center">
      <Box flexGrow={1}>
        {left instanceof Array ? <ActionsSet fullWidth set={left} /> : left}
      </Box>
      <Box>
        {right instanceof Array ? <ActionsSet fullWidth set={right} /> : right}
      </Box>
    </Box>
  </Box>
)

export default Actions
