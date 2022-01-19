import React from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useUser } from './hooks'
import Skeleton from '@mui/material/Skeleton'
const UserProfileSkeleton = () => (
  <Box display="flex" alignItems="center">
    <Skeleton
      variant="rect"
      style={{ borderRadius: 16 }}
      width={40}
      height={40}
    />
    <Box p={1}>
      <Skeleton variant="text" width={100} />
    </Box>
  </Box>
)

const UserProfile = ({ _id }) => {
  const { user, loading } = useUser(_id)
  if (loading) return <UserProfileSkeleton />
  return (
    <Box display="flex" alignItems="center">
      <Avatar
        variant="rounded"
        alt={user && user.name}
        src={user && user.avatar}
      />
      {user && user.name && (
        <Box p={1}>
          <Typography>{user.name}</Typography>
        </Box>
      )}
    </Box>
  )
}
export default UserProfile
