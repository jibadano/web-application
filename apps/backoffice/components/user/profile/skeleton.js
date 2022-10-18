import React from 'react'
import Box from '@mui/material/Box'

import Skeleton from '@mui/material/Skeleton'

const UserProfileSkeleton = () => (
  <Box display="flex" alignItems="center">
    <Skeleton
      variant="rect"
      style={{ borderRadius: 16 }}
      width={50}
      height={50}
    />
    <Box p={1}>
      <Skeleton variant="text" width={100} />
      <Skeleton variant="text" width={80} />
    </Box>
  </Box>
)

export default UserProfileSkeleton
