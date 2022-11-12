import React from 'react'
import { useTranslation } from 'lib/i18next'
import Title from '@backoffice/components/common/title'
import LogTable from '@backoffice/components/logs/table'
import TrafficMap from '@backoffice/components/traffic/map'
import TrafficDevice from '@backoffice/components/traffic/device'
import LogsOutput from '@backoffice/components/logs/output'

import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

const Logs = () => {
  const { t } = useTranslation()
  const [nav, setNav] = React.useState(0)

  return (
    <>
      <Title overtitle={t('backoffice.audition')}>
        {t('backoffice.audition.activity')}
      </Title>

      <Box my={4} mx={1}>
        <Tabs
          variant="scrollable"
          value={nav}
          onChange={(e, nav) => setNav(nav)}
        >
          <Tab label={t('backoffice.audition.logs')} />
          <Tab label={t('backoffice.audition.map')} />
          <Tab label={t('backoffice.audition.device')} />
          <Tab label={t('backoffice.audition.serverOutput')} />
        </Tabs>
      </Box>
      {nav == 0 && <LogTable />}
      {nav == 1 && <TrafficMap />}
      {nav == 2 && <TrafficDevice />}
      {nav == 3 && <LogsOutput />}
    </>
  )
}

export default Logs
