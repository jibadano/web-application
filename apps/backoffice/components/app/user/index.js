import React from 'react'

import Actions from '@backoffice/components/app/actions'
import Divider from '@mui/material/Divider'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import DeleteIcon from '@mui/icons-material/Delete'
import UserEdit from './edit'
import UserSecurity from './security'

const User = ({
  _id,
  role,
  currentUser,
  name,
  avatar,
  jobTitle,
  onDone = () => {}
}) => {
  return (
    <Box>
      <UserEdit _id={_id} name={name} avatar={avatar} jobTitle={jobTitle} />
      <Divider />
      <UserSecurity _id={_id} />
      <Divider />
      {(role == 'ADMIN' || currentUser) && (
        <Box sx={{ my: 3 }}>
          <Typography sx={{ mb: 2 }} variant="h5" color="error">
            Dangerous zone
          </Typography>
          <Button variant="contained" color="error" endIcon={<DeleteIcon />}>
            Delete user
          </Button>
        </Box>
      )}
      <Divider />
      <Box sx={{ my: 3 }}>
        <Actions
          left={[{ children: 'Back', variant: 'text', onClick: onDone }]}
        />
      </Box>
    </Box>
  )
}

export default User
