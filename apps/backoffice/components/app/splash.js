import React from 'react'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'

import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    height: '100%'
  }
}))

export default () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h5" gutterBottom>
          Backoffice
        </Typography>
        <LinearProgress variant="indeterminate" />
      </div>
    </div>
  )
}
