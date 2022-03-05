import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    height: '100%'
  }
}))

const Loading = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CircularProgress size={64} thickness={5} variant="indeterminate" />
    </div>
  )
}

export default Loading
