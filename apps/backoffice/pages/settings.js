import React from 'react'
import { useTranslation } from 'lib/i18next'
import Title from '@backoffice/components/common/title'
import Box from '@mui/material/Box'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import DeploymentList from '@backoffice/components/settings/deployment/list'
import ThemeEditor from '@backoffice/components/theme/editor'

import TranslationEditor from '@backoffice/components/translation/editor'
import TranslationSettings from '@backoffice/components/translation/settings'

import MainSettings from '@backoffice/components/settings/main'
import DeploymentButton from '@backoffice/components/settings/deployment/button'

const Settings = () => {
  const { t } = useTranslation()
  const [nav, setNav] = React.useState(0)

  return (
    <>
      <Title
        overtitle={t('backoffice.configuration')}
        actions={<DeploymentButton />}
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
          <Tab label={t('backoffice.deployments')} />
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
