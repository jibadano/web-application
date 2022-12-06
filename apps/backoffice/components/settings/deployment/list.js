import React from 'react'
import { useTranslation } from 'lib/i18next'
import { useDeployments } from '../hooks'
import DataTable from '@backoffice/components/common/data/table'
import Status from '@backoffice/components/common/status'
import Modal from '@backoffice/components/common/modal'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import MoreIcon from '@mui/icons-material/MoreHoriz'
import DataList from '@backoffice/components/common/data/list'
import DataListItem from '@backoffice/components/common/data/list/item'

const Users = () => {
  const { t } = useTranslation()
  const [deployDetails, setDeployDetails] = React.useState()
  const { deployments, loading } = useDeployments()

  return (
    <>
      <Modal
        onClose={() => setDeployDetails()}
        open={Boolean(deployDetails)}
        title={t('backoffice.deployment.details')}
        actions={
          <Button sx={{ m: 1 }} onClick={() => setDeployDetails()}>
            {t('backoffice.cancel')}
          </Button>
        }
      >
        {Boolean(deployDetails) && (
          <DataList>
            <DataListItem
              label={t('backoffice.id')}
              primary={deployDetails._id}
            />
            <DataListItem
              label={t('backoffice.deployment.commit')}
              secondary={`...${deployDetails.commit._id.substr(-6)}`}
              primary={deployDetails.commit.message}
            />
            <DataListItem
              label={t('backoffice.createdAt')}
              primary={deployDetails.createdAt}
            />
            <DataListItem
              label={t('backoffice.finishedAt')}
              primary={deployDetails.finishedAt}
            />
          </DataList>
        )}
      </Modal>
      <DataTable
        config={[
          {
            title: t('backoffice.deployment.service'),
            _id: 'service'
          },
          {
            title: t('backoffice.deployment.module'),
            _id: 'moduleId'
          },

          {
            title: t('backoffice.status')
          },
          {
            title: t('backoffice.deployment.commit')
          },
          {
            title: t('backoffice.createdAt'),
            _id: 'createdAt'
          },
          {
            title: t('backoffice.finishedAt'),
            _id: 'finishedAt'
          },
          {}
        ]}
        rows={deployments.map(
          ({
            _id,
            createdAt,
            finishedAt,
            status,
            service,
            moduleId,
            commit
          }) => ({
            values: [
              <Chip label={service} />,
              <Chip color="primary" label={moduleId} />,
              <Status
                variant="outlined"
                inprogress={status == 'info'}
                severity={status}
              >
                {{
                  info: t('backoffice.deployment.status.deploying'),
                  ok: t('backoffice.deployment.status.ready'),
                  error: t('backoffice.deployment.status.error'),
                  warning: t('backoffice.deployment.status.canceled')
                }[status] || t('backoffice.deployment.status.deactivated')}
              </Status>,
              commit.message,
              createdAt,
              finishedAt,

              <Box display="flex" justifyContent="right">
                <Box px={1}>
                  <IconButton
                    onClick={() =>
                      setDeployDetails({
                        _id,
                        createdAt,
                        finishedAt,
                        status,
                        service,
                        moduleId,
                        commit
                      })
                    }
                  >
                    <MoreIcon />
                  </IconButton>
                </Box>
              </Box>
            ],
            _id
          })
        )}
        loading={loading}
      />
    </>
  )
}

export default Users
