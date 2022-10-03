import React from 'react'
import Title from '@backoffice/components/app/title'
import LogTable from '@backoffice/components/app/logs/table'
import TrafficMap from '@backoffice/components/app/traffic/map'

const Logs = () => (
  <>
    <Title overtitle="Audition">Log activity</Title>
    <LogTable />
    <TrafficMap />
  </>
)

export default Logs
