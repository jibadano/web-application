import 'react-json-pretty/themes/1337.css'
import React from 'react'
import { useTranslation } from 'lib/i18next'

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
  const { t } = useTranslation()

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
        title={t('backoffice.deployment.restore')}
        actions={
          <>
            <Button sx={{ m: 1 }} onClick={() => setConfirmRedeploy()}>
              {t('backoffice.cancel')}
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
              {t('backoffice.deployment.restore.button')}
            </Button>
          </>
        }
      >
        <Typography>{t('backoffice.deployment.restore.message')}</Typography>
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
            {displaySettings
              ? t('backoffice.deployment.restore.hideSettings')
              : t('backoffice.deployment.restore.displaySettings')}
          </Button>
        </Box>
      </Modal>
      <DataTable
        config={[
          {
            title: t('backoffice.id')
          },
          {
            title: t('backoffice.date'),
            _id: 'date'
          },
          {
            title: t('backoffice.status')
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
                  info: t('backoffice.deployment.status.deploying'),
                  ok: t('backoffice.deployment.status.ready'),
                  error: t('backoffice.deployment.status.error'),
                  warning: t('backoffice.deployment.status.warning')
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
