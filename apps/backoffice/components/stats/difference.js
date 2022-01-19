import React from 'react'
import { Typography } from '@mui/material'
import { green, red } from '@mui/material/colors'

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  differenceIconUp: {
    color: green[800]
  },
  differenceValueUp: {
    color: green[800],
    marginRight: theme.spacing(1)
  },
  differenceIconDown: {
    color: red[800]
  },
  differenceValueDown: {
    color: red[800],
    marginRight: theme.spacing(1)
  }
}))

const DifferenceValue = ({ previous = 1, current = 1, desc }) => {
  const classes = useStyles()
  const value = Math.abs(Math.round((current / previous - 1) * 100))
  const up = current > previous
  return up ? (
    <>
      <ArrowUpwardIcon className={classes.differenceIconUp} />
      <Typography className={classes.differenceValueUp} variant="body2">
        {value}%
      </Typography>
      <Typography color="textSecondary" variant="caption">
        {desc}
      </Typography>
    </>
  ) : (
    <>
      <ArrowDownwardIcon className={classes.differenceIconDown} />
      <Typography className={classes.differenceValueDown} variant="body2">
        {value}%
      </Typography>
      <Typography color="textSecondary" variant="caption">
        {desc}
      </Typography>
    </>
  )
}

export default DifferenceValue
