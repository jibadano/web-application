import React from 'react'
import Title from '@backoffice/components/common/title'
import LogTable from '@backoffice/components/logs/table'
import TrafficMap from '@backoffice/components/traffic/map'
import TrafficDevice from '@backoffice/components/traffic/device'
import LogsOutput from '@backoffice/components/logs/output'

import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

const Logs = () => {
  const [nav, setNav] = React.useState(0)

  return (
    <>
      <Title overtitle="Audition">Activity</Title>

      <Box my={4} mx={1}>
        <Tabs
          variant="scrollable"
          value={nav}
          onChange={(e, nav) => setNav(nav)}
        >
          <Tab label="Logs" />
          <Tab label="Map" />
          <Tab label="Device" />
          <Tab label="Server output" />
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
