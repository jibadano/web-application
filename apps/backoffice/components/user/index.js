import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import UserEdit from './edit'
import UserSecurity from './security'
import UserRemove from './remove'

const User = ({ _id, onDone = () => {} }) => (
  <Box sx={{ display: 'grid', gap: 3 }}>
    <Box sx={{ display: 'flex' }}>
      <Button onClick={onDone}>Back</Button>
    </Box>
    <UserEdit _id={_id} />
    <UserSecurity _id={_id} />
    <UserRemove onRemoved={onDone} _id={_id} />
  </Box>
)

export default User
