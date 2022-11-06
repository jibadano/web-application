import React from 'react'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'

const CardSkeleton = () => (
  <Box
    component={Paper}
    sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}
  >
    <Box display="flex" alignItems="center" flexGrow={1}>
      <Skeleton variant="rounded" height={60} width={60} />
      <Skeleton variant="text" height={50} width="70%" sx={{ ml: 2 }} />
    </Box>
    <Box py={2} flexGrow={2}>
      <Skeleton variant="text" height={30} />
      <Skeleton variant="text" height={30} />
      <Skeleton variant="text" height={30} />
      <Skeleton variant="text" height={30} width="40%" />
    </Box>
    <Box>
      <Skeleton variant="text" height={50} width={120} />
    </Box>
  </Box>
)

export default CardSkeleton
