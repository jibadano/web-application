import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'

import DeleteIcon from '@mui/icons-material/Delete'
import { useMe } from './hooks'
import { useRole, useRemoveCredential } from '../auth/hooks'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'

const UserRemove = ({ _id, onDone = () => {} }) => {
  const { me } = useMe()
  const role = useRole()
  const [open, setOpen] = React.useState()
  const [removeCredential] = useRemoveCredential()
  if (role != 'ADMIN' && me && me._id != _id) return ''

  return (
    <>
      <Dialog maxWidth="md" onClose={() => setOpen()} open={open}>
        <DialogTitle>
          You are going to remove <strong>{_id}</strong>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure? this action cannot be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen()}>Cancel</Button>
          <Button
            color="error"
            onClick={() => removeCredential({ _id }).then(setDone)}
            variant="contained"
            autoFocus
          >
            Yes, remove user
          </Button>
        </DialogActions>
      </Dialog>
      <Paper
        sx={{
          p: 4,
          maxWidth: 'sm',
          borderColor: 'error.light'
        }}
      >
        <Box sx={{ my: 3 }}>
          <Typography sx={{ mb: 2 }} variant="h5" color="error">
            Dangerous zone
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpen(true)}
            endIcon={<DeleteIcon />}
          >
            Delete user
          </Button>
        </Box>
      </Paper>
    </>
  )
}

export default UserRemove
