import React from 'react'
import { Grid, Button, Link } from '@mui/material'
import Traffic from '@backoffice/components/traffic/stats'
import TrafficMap from '@backoffice/components/traffic/map'
import Device from '@backoffice/components/traffic/device'
import DeploymentList from '@backoffice/components/deployment/list'
import { useMe } from '@backoffice/components/user/hooks'
import Title from '@backoffice/components/common/title'
import FormattedDate from '@backoffice/components/common/formattedDate'
import CardInfo from '@backoffice/components/common/card/info'
import CardMetric from '@backoffice/components/common/card/metric'
import LaunchIcon from '@mui/icons-material/launch'

import config from '@jibadano/config'

const dayPart = () => {
  let hour = new Date().getHours()
  if (hour > 5 && hour <= 12) return 'morning'

  if (hour > 12 && hour <= 18) return 'afternoon'

  if (hour > 18 && hour <= 22) return 'evening'

  return 'night'
}

const Dashboard = () => {
  const { me } = useMe()
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Title
          overtitle="Overview"
          subtitle="Here's what's happening with your business today"
        >
          Good {dayPart()}
          {Boolean(me && me.name) ? `, ${me.name}` : ''}
        </Title>
      </Grid>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <CardMetric title={'TODAY'} icon={<FormattedDate />} />
      </Grid>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <Traffic />
      </Grid>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <Traffic />
      </Grid>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <CardInfo
          title={'YOUR SITE'}
          actions={
            <Link
              rel="noopener"
              href={config.get('..apps.web.url')}
              target="_blank"
            >
              <Button size="small">
                Go to the website <LaunchIcon sx={{ ml: 1 }} fontSize="small" />
              </Button>
            </Link>
          }
        >
          Check your live site
        </CardInfo>
      </Grid>
      <Grid item lg={8} md={6} xl={3} xs={12}>
        <TrafficMap />
      </Grid>
      <Grid item lg={4} md={6} xl={3} xs={12}>
        <Device />
      </Grid>
      <Grid item xs={12}>
        <DeploymentList />
      </Grid>
    </Grid>
  )
}
export default Dashboard
