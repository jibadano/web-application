import 'react-json-pretty/themes/1337.css'
import React from 'react'
import { useDeployments, useStartDeploy } from '../settings/hooks'
import DataTable from '@backoffice/components/common/data/table'
import Status from '@backoffice/components/common/status'
import Modal from '@backoffice/components/common/modal'

import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'

import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'

import ReplayIcon from '@mui/icons-material/Replay'
import FolderIcon from '@mui/icons-material/Folder'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'

import JSONPretty from 'react-json-pretty'
const Users = () => {
  const [startDeploy] = useStartDeploy()
  const [open, setOpen] = React.useState()
  const [confirmRedeploy, setConfirmRedeploy] = React.useState()
  const [displaySettings, setDisplaySettings] = React.useState()

  const { deployments, loading } = useDeployments()

  return (
    <>
      <Dialog
        maxWidth="md"
        PaperProps={{ sx: { border: 'none' } }}
        onClose={() => setOpen()}
        open={Boolean(open)}
      >
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

      <Modal
        onClose={() => setConfirmRedeploy()}
        open={Boolean(confirmRedeploy)}
        title={'Do you want to restore this settings?'}
        actions={
          <>
            <Button sx={{ m: 1 }} onClick={() => setConfirmRedeploy()}>
              Cancel
            </Button>
            <Button
              sx={{ m: 1 }}
              onClick={() =>
                startDeploy({ variables: { _id: confirmRedeploy._id } })
              }
              color="primary"
              variant="contained"
              autoFocus
            >
              Redeploy
            </Button>
          </>
        }
      >
        <Typography>
          If you click Redeploy you will restore this settings
        </Typography>
        <Collapse in={displaySettings}>
          <Box p={2}>
            {confirmRedeploy && (
              <div>
                <JSONPretty
                  data={confirmRedeploy.settings}
                  mainStyle="padding:40px;margin:0"
                  errorStyle="padding:40px;margin:0"
                ></JSONPretty>
              </div>
            )}
          </Box>
        </Collapse>
        <Box p={2}>
          <Button onClick={() => setDisplaySettings((d) => !d)}>
            {displaySettings ? 'Hide settings' : 'Display settings'}
          </Button>
        </Box>
      </Modal>
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
            `...${_id.substr(-6)}`,
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
