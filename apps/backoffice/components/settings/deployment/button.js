import React from 'react'
import { useTranslation } from 'lib/i18next'
import Button from '@mui/material/Button'
import { useDeployStatus, useDeploy } from '../hooks'
import Loading from '@backoffice/components/common/loading'
import DeployIcon from '@mui/icons-material/SendAndArchive'

const DeploymentButton = () => {
  const { t } = useTranslation()
  const [deploy] = useDeploy()
  const { deployStatus, loading } = useDeployStatus()

  if (loading) return <Loading />
  if (!deployStatus || ['info', 'warning'].indexOf(deployStatus) == -1)
    return ''

  const deploying = deployStatus == 'info'
  return (
    <Button
      startIcon={deploying ? <Loading size={16} /> : <DeployIcon />}
      variant="contained"
      disabled={deploying}
      color="primary"
      onClick={deploy}
    >
      {deploying
        ? t('backoffice.deployment.status.deploying')
        : t('backoffice.deploy')}
    </Button>
  )
}

export default DeploymentButton
