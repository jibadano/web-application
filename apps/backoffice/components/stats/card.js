import React from 'react'
import clsx from 'clsx'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

import Skeleton from '@mui/material/Skeleton'
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  }
}))

export const StatCardSkeleton = () => (
  <Card>
    <CardContent>
      <Grid container justify="space-between" spacing={3}>
        <Grid item>
          <Skeleton height={20} width={150} />
          <Skeleton height={20} width={100} />
        </Grid>
        <Grid item>
          <Skeleton height={56} width={56} variant="circle" />
        </Grid>
      </Grid>
      <Box mt={3}>
        <Skeleton />
      </Box>
    </CardContent>
  </Card>
)

const StatCard = ({ className, title, value, icon, desc, ...rest }) => {
  const classes = useStyles()

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {value}
            </Typography>
          </Grid>
          {icon && <Grid item>{icon}</Grid>}
        </Grid>
        {desc}
      </CardContent>
    </Card>
  )
}

export default StatCard
