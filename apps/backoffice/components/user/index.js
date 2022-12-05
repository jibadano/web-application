import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import UserEdit from './edit'
import UserSecurity from './security'
import ChangePassword from './changePassword'
import UserRemove from './remove'
import { useTranslation } from 'lib/i18next'

const User = ({ _id, onDone = () => {} }) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ display: 'grid', gap: 3 }}>
      <Box sx={{ display: 'flex' }}>
        <Button onClick={onDone}>{t('backoffice.back')}</Button>
      </Box>
      <UserEdit _id={_id} />
      <UserSecurity _id={_id} />
      <ChangePassword _id={_id} />
      <UserRemove onRemoved={onDone} _id={_id} />
    </Box>
  )
}

export default User
