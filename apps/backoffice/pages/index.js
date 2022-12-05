import React from 'react'
import { useTranslation } from 'lib/i18next'
import { Grid, Button, Link } from '@mui/material'
import Traffic from '@backoffice/components/traffic/stats'
import TrafficMap from '@backoffice/components/traffic/map'
import Device from '@backoffice/components/traffic/device'
import DeploymentList from '@backoffice/components/settings/deployment/list'
import { useMe } from '@backoffice/components/user/hooks'
import Title from '@backoffice/components/common/title'
import FormattedDate from '@backoffice/components/common/formattedDate'
import CardInfo from '@backoffice/components/common/card/info'
import CardMetric from '@backoffice/components/common/card/metric'
import LaunchIcon from '@mui/icons-material/Launch'

import config from '@jibadano/config'

const greeting = () => {
  let hour = new Date().getHours()
  if (hour > 5 && hour <= 12) return 'backoffice.dashboard.greeting.morning'

  if (hour > 12 && hour <= 18) return 'backoffice.dashboard.greeting.afternoon'

  if (hour > 18 && hour <= 22) return 'backoffice.dashboard.greeting.evening'

  return 'backoffice.dashboard.greeting.night'
}

const Dashboard = () => {
  const { t } = useTranslation()
  const { me } = useMe()

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Title
          overtitle={t('backoffice.dashboard')}
          subtitle={t('backoffice.dashboard.message')}
        >
          {t(greeting())} {Boolean(me && me.name) && me.name}
        </Title>
      </Grid>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <CardMetric
          title={t('backoffice.dashboard.today')}
          icon={<FormattedDate />}
        />
      </Grid>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <Traffic />
      </Grid>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <Traffic />
      </Grid>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <CardInfo
          title={t('backoffice.dashboard.yourSite')}
          actions={
            <Link
              rel="noopener"
              href={config.get('..apps.web.url')}
              target="_blank"
            >
              <Button size="small">
                {t('backoffice.dashboard.yourSite.goto')}{' '}
                <LaunchIcon sx={{ ml: 1 }} fontSize="small" />
              </Button>
            </Link>
          }
        >
          {t('backoffice.dashboard.yourSite.check')}
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
