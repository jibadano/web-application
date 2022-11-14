import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { useTranslation } from 'lib/i18next'

import DeleteIcon from '@mui/icons-material/Delete'
import { useMe } from './hooks'
import { useRole, useRemoveCredential } from '../auth/hooks'
import Modal from '@backoffice/components/common/modal'

const UserRemove = ({ _id, onDone = () => {} }) => {
  const { me } = useMe()
  const { t } = useTranslation()
  const role = useRole()
  const [open, setOpen] = React.useState()
  const [removeCredential] = useRemoveCredential()
  if (role != 'ADMIN' && me && me._id != _id) return ''

  return (
    <>
      <Modal
        onClose={() => setOpen()}
        open={open}
        title={t('backoffice.user.remove.confirm.title', { _id })}
        actions={
          <>
            <Button color="inherit" onClick={() => setOpen()}>
              {t('backoffice.cancel')}
            </Button>
            <Button
              color="error"
              onClick={() => removeCredential({ _id }).then(onDone)}
              variant="contained"
              autoFocus
            >
              {t('backoffice.user.remove.confirm')}
            </Button>
          </>
        }
      >
        <Typography>{t('backoffice.user.remove.confirm.message')}</Typography>
      </Modal>

      <Paper
        sx={{
          p: 4,
          borderColor: 'error.light'
        }}
      >
        <Typography sx={{ mb: 2 }} variant="h5" color="error">
          {t('backoffice.user.remove.title')}
        </Typography>
        <Box sx={{ my: 3 }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpen(true)}
            endIcon={<DeleteIcon />}
          >
            {t('backoffice.user.remove')}
          </Button>
        </Box>
      </Paper>
    </>
  )
}

export default UserRemove
