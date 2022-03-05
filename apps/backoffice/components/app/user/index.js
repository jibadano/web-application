import React from 'react'

import Actions from '@backoffice/components/app/actions'
import DataList from '@backoffice/components/app/dataList'
import DataListItem from '@backoffice/components/app/dataListItem'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import { useRemoveCredential } from '../auth/hooks'

const User = ({
  _id,
  role,
  currentUser,
  name,
  avatar,
  jobTitle,
  onEdit = () => {},
  onSecurity = () => {},
  onDone = () => {}
}) => {
  const [removeCredential] = useRemoveCredential()

  if (!_id)
    return (
      <Paper>
        <Box
          height="50vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            endIcon={<EditIcon />}
            variant="contained"
            color="primary"
            onClick={onEdit}
          >
            Configure profile
          </Button>
        </Box>
      </Paper>
    )

  return (
    <DataList images={avatar ? [avatar] : []}>
      <DataListItem label="Name" primary={name} />
      <DataListItem label="E-mail" primary={_id} />
      <DataListItem label="Job Title" primary={jobTitle} />

      <Box p={2} width="100%">
        <Actions
          left={[{ children: 'Back', variant: 'text', onClick: onDone }]}
          right={[
            {
              display: Boolean(role == 'ADMIN' || currentUser),
              endIcon: <DeleteIcon />,
              children: 'Delete',
              variant: 'outlined',
              color: 'secondary',
              onClick: () =>
                removeCredential({ variables: { _id } }).then(onDone)
            },
            {
              display: Boolean(role == 'ADMIN' || currentUser),
              children: 'Security',
              variant: 'outlined',
              color: 'primary',
              onClick: onSecurity
            },
            {
              display: Boolean(role == 'ADMIN' || currentUser),
              endIcon: <EditIcon />,
              children: 'Edit',
              variant: 'contained',
              color: 'primary',
              onClick: onEdit
            }
          ]}
        />
      </Box>
    </DataList>
  )
}

export default User
