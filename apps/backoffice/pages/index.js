import React from 'react'
import { Grid } from '@mui/material'

import Traffic from '@backoffice/components/traffic/stats'
import TrafficMap from '@backoffice/components/traffic/map'

import Device from '@backoffice/components/traffic/device'
import { useMe } from '@backoffice/components/user/hooks'

import Title from '@backoffice/components/common/title'

const Dashboard = () => {
  const { me } = useMe()
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Title
          overtitle="Overview"
          subtitle="Here's what's happening with your business today"
        >
          Good Morning{Boolean(me && me.name) ? `, ${me.name}` : ''}
        </Title>
      </Grid>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <Traffic />
      </Grid>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <Traffic />
      </Grid>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <Traffic />
      </Grid>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <Traffic />
      </Grid>
      <Grid item lg={8} md={6} xl={3} xs={12}>
        <TrafficMap />
      </Grid>
      <Grid item lg={4} md={6} xl={3} xs={12}>
        <Device />
      </Grid>
    </Grid>
  )
}
export default Dashboard
