import React from 'react'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'

const CardMetric = ({ title, value, icon, desc, ...rest }) => (
  <Card sx={{ height: '100%' }} {...rest}>
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

export default CardMetric
