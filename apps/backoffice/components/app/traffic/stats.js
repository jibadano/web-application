import React from 'react'
import { makeStyles } from '@mui/styles'

import StatCard, { StatCardSkeleton } from '../../stats/card'
import StatDifference from '../../stats/difference'
import AccountIcon from '@mui/icons-material/SupervisorAccount'
import Avatar from '@mui/material/Avatar'
import { useTraffic } from './hooks'
import Box from '@mui/material/Box'

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.light,
    height: 56,
    width: 56
  }
}))

const TrafficStat = () => {
  const classes = useStyles()
  const { data, loading } = useTraffic()

  const traffic = data && data.traffic
  if (loading || !traffic) return <StatCardSkeleton />

  return (
    <StatCard
      title="TOTAL CUSTOMERS"
      value={traffic.current}
      icon={
        <Avatar className={classes.avatar}>
          <AccountIcon fontSize="large" />
        </Avatar>
      }
      desc={
        <Box mt={2} display="flex" alignItems="center">
          <StatDifference
            current={traffic.current}
            previous={traffic.previous}
            desc="Since last month"
          />
        </Box>
      }
    />
  )
}

export default TrafficStat
