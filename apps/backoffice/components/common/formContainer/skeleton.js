import React from 'react'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

const FormSkeleton = () => (
  <>
    <Box display="flex" alignItems="center">
      <Box flexGrow={1}>
        <Skeleton variant="text" height={60} width="70%" />
      </Box>
      <Box>
        <Skeleton variant="text" height={60} width={60} />
      </Box>
    </Box>
    <Box>
      <Skeleton height={90} />
      <Skeleton height={90} />
      <Skeleton height={90} />
    </Box>
  </>
)

export default FormSkeleton
