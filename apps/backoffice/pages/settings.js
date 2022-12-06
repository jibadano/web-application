import React from 'react'
import { useRouter } from 'lib/router'
import { useTranslation } from 'lib/i18next'
import Title from '@backoffice/components/common/title'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import DeploymentList from '@backoffice/components/settings/deployment/list'

import ThemeEditor from '@backoffice/components/settings/theme/editor'
import TranslationSettings from '@backoffice/components/settings/translation'
import MainSettings from '@backoffice/components/settings/main'
import DeploymentButton from '@backoffice/components/settings/deployment/button'
import CardInfo from '@backoffice/components/common/card/info'

const Settings = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [nav, setNav] = React.useState(parseInt(router.query.nav) || 0)

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
      {nav == 1 && <TranslationSettings />}
      {nav == 2 && <ThemeEditor />}
      {nav == 3 && <DeploymentList />}
      <Box sx={{ maxWidth: 'sm', mt: 2 }}>
        <CardInfo
          title={t('backoffice.settings.deployReminder')}
          actions={<DeploymentButton />}
        >
          {t('backoffice.settings.deployReminder.message')}
        </CardInfo>
      </Box>
    </>
  )
}

export default Settings
