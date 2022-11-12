import React from 'react'
import { useRouter } from 'lib/router'
import { useTranslation } from 'lib/i18next'
import { useMe } from '../../user/hooks'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useUser } from '../hooks'
import UserProfileSkeleton from './skeleton'

const UserProfile = ({ _id }) => {
  const router = useRouter()
  const { t } = useTranslation()
  const { me } = useMe()

  const { user, loading } = useUser(_id)

  if (loading) return <UserProfileSkeleton />
  if (!user)
    return (
      <Button
        size="small"
        variant="link"
        onClick={() => router.push('user?_id=' + (me && me._id))}
      >
        {t('backoffice.user.configure')}
      </Button>
    )

  return (
    <Button
      sx={{ display: 'flex', justifyContent: 'flex-start' }}
      fullWidth
      variant="link"
      onClick={() => router.push('user?_id=' + user._id)}
    >
      <Avatar
        sx={{ width: 50, height: 50 }}
        variant="rounded"
        alt={user && user.name}
        src={user && user.avatar}
      />
      {user && user.name && (
        <Box
          px={1}
          sx={{ display: 'flex', alignItems: 'flex-end', textAlign: 'left' }}
        >
          <div>
            <Typography variant="body1" textTransform="none">
              {user.name}
            </Typography>
            <Typography variant="caption">{user.jobTitle}</Typography>
          </div>
        </Box>
      )}
    </Button>
  )
}
export default UserProfile
