import React from 'react'
import Chip from '@mui/material/Chip'
import { green, red, amber, blue, grey } from '@mui/material/colors'
import CircularProgress from '@mui/material/CircularProgress'

const Status = ({
  children,
  icon,
  inprogress,
  severity,
  variant,
  ...props
}) => {
  let color =
    {
      ok: green,
      error: red,
      info: blue,
      warning: amber
    }[severity] || grey

  const styles =
    variant == 'outlined'
      ? {
          color: color[700],
          borderColor: color[600],
          '&>.MuiChip-avatar': {
            color: color[600]
          }
        }
      : {
          color: 'white',
          backgroundColor: color[600],
          '&>.MuiChip-avatar': {
            color: 'white'
          }
        }

  return (
    <Chip
      sx={styles}
      onDelete={icon ? () => {} : ''}
      deleteIcon={icon}
      avatar={inprogress && <CircularProgress size={16} thickness={6} />}
      size="small"
      label={children && children.toUpperCase && children.toUpperCase()}
      variant={variant}
      {...props}
    />
  )
}

export default Status
