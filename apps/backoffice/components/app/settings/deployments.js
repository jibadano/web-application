import React from 'react'
import { useDeployments, useStartDeploy } from './hooks'
import DataTable from '@backoffice/components/app/dataTable'
import Status from '@backoffice/components/app/status'

import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'

import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'

import ReplayIcon from '@mui/icons-material/Replay'
import FolderIcon from '@mui/icons-material/Folder'
import Collapse from '@mui/material/Collapse'

import JSONPretty from 'react-json-pretty'
const Users = () => {
  const [startDeploy] = useStartDeploy()
  const [open, setOpen] = React.useState()
  const [confirmRedeploy, setConfirmRedeploy] = React.useState()
  const [displaySettings, setDisplaySettings] = React.useState()

  const { deployments, loading } = useDeployments()

  return (
    <>
      <Dialog maxWidth="md" onClose={() => setOpen()} open={Boolean(open)}>
        {open && (
          <div>
            <JSONPretty
              data={open.settings}
              mainStyle="padding:40px;margin:0"
              errorStyle="padding:40px;margin:0"
            ></JSONPretty>
          </div>
        )}
      </Dialog>
      <Dialog
        maxWidth="md"
        onClose={() => setConfirmRedeploy()}
        open={Boolean(confirmRedeploy)}
      >
        <DialogTitle>Do you want to restore this settings?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you click Redeploy you will restore this settings
          </DialogContentText>
          <Collapse in={displaySettings}>
            {confirmRedeploy && (
              <div>
                <JSONPretty
                  data={confirmRedeploy.settings}
                  mainStyle="padding:40px;margin:0"
                  errorStyle="padding:40px;margin:0"
                ></JSONPretty>
              </div>
            )}
          </Collapse>
          <Box p={2}>
            <Button onClick={() => setDisplaySettings((d) => !d)}>
              {displaySettings ? 'Hide settings' : 'Display settings'}
            </Button>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setConfirmRedeploy()}>Cancel</Button>
          <Button
            onClick={() =>
              startDeploy({ variables: { _id: confirmRedeploy._id } })
            }
            color="primary"
            variant="contained"
            autoFocus
          >
            Redeploy
          </Button>
        </DialogActions>
      </Dialog>
      <DataTable
        config={[
          {
            title: 'ID'
          },
          {
            title: 'Date',
            _id: 'date'
          },
          {
            title: 'Status'
          },
          {}
        ]}
        rows={deployments.map(({ _id, date, settings, status }) => ({
          values: [
            _id,
            new Date(parseInt(date)).toLocaleDateString() +
              ' ' +
              new Date(parseInt(date)).toLocaleTimeString(),
            <Status
              variant="outlined"
              inprogress={status == 'info'}
              severity={status}
            >
              {
                {
                  info: 'Deploying',
                  ok: 'Ready',
                  error: 'Error',
                  warning: 'Warning'
                }[status]
              }
            </Status>,
            <Box display="flex" justifyContent="right">
              <Box px={1}>
                <IconButton>
                  <FolderIcon onClick={() => setOpen({ _id, settings })} />
                </IconButton>
              </Box>
              <Box px={1}>
                <IconButton
                  onClick={() => setConfirmRedeploy({ _id, settings })}
                >
                  <ReplayIcon />
                </IconButton>
              </Box>
            </Box>
          ],
          _id
        }))}
        loading={loading}
      />
    </>
  )
}

export default Users
