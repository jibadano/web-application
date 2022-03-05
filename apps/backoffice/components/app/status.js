import React from 'react'
import { makeStyles } from '@mui/styles'

import Chip from '@mui/material/Chip'
import { green, red, amber, blue, grey } from '@mui/material/colors'

import CircularProgress from '@mui/material/CircularProgress'

const useStyles = makeStyles({
  root: ({ severity, variant }) => {
    let color = grey
    if (severity == 'ok') color = green
    if (severity == 'error') color = red
    if (severity == 'info') color = blue
    if (severity == 'warning') color = amber

    if (variant == 'outlined')
      return {
        color: color[700],
        borderColor: color[600],
        '&>.MuiChip-avatar': {
          color: color[600]
        }
      }
    else
      return {
        color: 'white',
        backgroundColor: color[600],
        '&>.MuiChip-avatar': {
          color: 'white'
        }
      }
  }
})

const Status = ({
  children,
  icon,
  inprogress,
  severity,
  variant,
  ...props
}) => {
  const classes = useStyles({ severity, variant })
  return (
    <Chip
      onDelete={icon ? () => {} : ''}
      deleteIcon={icon}
      avatar={inprogress && <CircularProgress size={16} thickness={6} />}
      size="small"
      className={classes.root}
      label={children && children.toUpperCase && children.toUpperCase()}
      variant={variant}
      {...props}
    />
  )
}

export default Status
