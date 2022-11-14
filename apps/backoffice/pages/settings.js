import React from 'react'
import { useTranslation } from 'lib/i18next'
import Title from '@backoffice/components/common/title'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import {
  useDeployStatus,
  useStartDeploy
} from '@backoffice/components/settings/hooks'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import DeploymentList from '@backoffice/components/deployment/list'
import ThemeEditor from '@backoffice/components/theme/editor'

import TranslationEditor from '@backoffice/components/translation/editor'
import TranslationSettings from '@backoffice/components/translation/settings'

import Badge from '@mui/material/Badge'
import MainSettings from '@backoffice/components/settings/main'
import DeployIcon from '@mui/icons-material/FlightTakeoff'

const Settings = () => {
  const { t } = useTranslation()
  const [nav, setNav] = React.useState(0)
  const [startDeploy] = useStartDeploy()
  const { deployStatus, loading: deployStatusLoading } = useDeployStatus()

  return (
    <>
      <Title
        overtitle={t('backoffice.configuration')}
        actions={
          <Button
            startIcon={<DeployIcon />}
            variant="contained"
            disabled={deployStatus == 'info'}
            color="primary"
            onClick={() => startDeploy().then(() => setNav(2))}
          >
            {t('backoffice.deploy')}
          </Button>
        }
      >
        {t('backoffice.settings')}
      </Title>
      <Box my={4} mx={1}>
        <Tabs
          variant="scrollable"
          value={nav}
          onChange={(_, nav) => setNav(nav)}
        >
          <Tab label={t('backoffice.settings.main')} />
          <Tab label={t('backoffice.translations')} />
          <Tab label={t('backoffice.theme')} />
          <Tab
            label={
              <Badge
                badgeContent={deployStatus == 'required' ? 1 : 0}
                variant="dot"
                color="secondary"
              >
                {t('backoffice.deployments')}
              </Badge>
            }
          />
        </Tabs>
      </Box>
      {nav == 0 && (
        <Box sx={{ maxWidth: 'sm' }}>
          <MainSettings />
        </Box>
      )}
      {nav == 1 && (
        <Box sx={{ display: 'grid', gap: 3, maxWidth: 'sm' }}>
          <Box sx={{ width: '100%' }}>
            <TranslationEditor />
          </Box>
          <Box>
            <TranslationSettings />
          </Box>
        </Box>
      )}
      {nav == 2 && <ThemeEditor />}
      {nav == 3 && <DeploymentList />}
    </>
  )
}

export default Settings
