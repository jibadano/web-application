import React from 'react'
import { useTranslation } from 'lib/i18next'
import StatCard from '@backoffice/components/common/card/metric'
import StatCardSkeleton from '@backoffice/components/common/card/metric/skeleton'
import StatDifference from '@backoffice/components/common/card/metric/difference'
import AccountIcon from '@mui/icons-material/SupervisorAccount'
import Avatar from '@mui/material/Avatar'
import { useTrafficStats } from './hooks'
import Box from '@mui/material/Box'

const TrafficStat = () => {
  const { t } = useTranslation()
  const { data, loading } = useTrafficStats()

  const traffic = data && data.trafficStats
  if (loading || !traffic) return <StatCardSkeleton />

  return (
    <StatCard
      title={t('backoffice.traffic.total')}
      value={traffic.current.toString()}
      icon={
        <Avatar
          sx={{ backgroundColor: 'secondary.light', height: 42, width: 42 }}
        >
          <AccountIcon />
        </Avatar>
      }
      desc={
        <Box mt={2} display="flex" alignItems="center">
          <StatDifference
            current={traffic.current}
            previous={traffic.previous}
            desc={t('backoffice.traffic.total.sinceLastMonth')}
          />
        </Box>
      }
    />
  )
}

export default TrafficStat
