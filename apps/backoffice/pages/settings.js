import React from 'react'
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
  const [nav, setNav] = React.useState(0)
  const [startDeploy] = useStartDeploy()
  const { deployStatus, loading: deployStatusLoading } = useDeployStatus()

  return (
    <>
      <Title
        overtitle="Configuration"
        actions={
          <Button
            startIcon={<DeployIcon />}
            variant="contained"
            disabled={deployStatus == 'info'}
            color="primary"
            onClick={() => startDeploy().then(() => setNav(2))}
          >
            Deploy
          </Button>
        }
      >
        Settings
      </Title>
      <Box my={4} mx={1}>
        <Tabs
          variant="scrollable"
          value={nav}
          onChange={(e, nav) => setNav(nav)}
        >
          <Tab label="Main" />
          <Tab label="Translations" />
          <Tab label="Theme" />
          <Tab
            label={
              <Badge
                badgeContent={deployStatus == 'required' ? 1 : 0}
                variant="dot"
                color="secondary"
              >
                Deployments
              </Badge>
            }
          />
        </Tabs>
      </Box>
      {nav == 0 && <MainSettings />}
      {nav == 1 && (
        <Box sx={{ display: 'grid', gap: 3 }}>
          <TranslationEditor /> <TranslationSettings />
        </Box>
      )}
      {nav == 2 && <ThemeEditor />}
      {nav == 3 && <DeploymentList />}
    </>
  )
}

export default Settings
