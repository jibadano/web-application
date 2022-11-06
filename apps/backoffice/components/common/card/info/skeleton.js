import React from 'react'
import { Box, Card, CardContent, Grid } from '@mui/material'

import Skeleton from '@mui/material/Skeleton'

const CardInfoSkeleton = () => (
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

export default CardInfoSkeleton
