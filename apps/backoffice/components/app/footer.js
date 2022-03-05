import React from 'react'
import { makeStyles } from '@mui/styles'

import Typography from '@mui/material/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 1)
  }
}))

const Footer = ({ name }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="caption" color="textSecondary">
        {name} - Backoffice {new Date().getFullYear()}
      </Typography>
    </div>
  )
}

export default Footer
