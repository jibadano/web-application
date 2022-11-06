import React from 'react'
import { Typography } from '@mui/material'
import { green, red } from '@mui/material/colors'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

const DifferenceValue = ({ previous = 1, current = 1, desc }) => {
  const value = Math.abs(Math.round((current / previous - 1) * 100))
  if (!value || !previous)
    return (
      <Typography variant="caption" color="textSecondary">
        No updates since last month
      </Typography>
    )
  const up = current > previous
  return up ? (
    <>
      <ArrowUpwardIcon sx={{ color: green[800] }} />
      <Typography sx={{ color: green[800], mr: 1 }} variant="body2">
        {value}%
      </Typography>
      <Typography color="textSecondary" variant="caption">
        {desc}
      </Typography>
    </>
  ) : (
    <>
      <ArrowDownwardIcon sx={{ color: red[800] }} />
      <Typography sx={{ color: red[800], mr: 1 }} variant="body2">
        {value}%
      </Typography>
      <Typography color="textSecondary" variant="caption">
        {desc}
      </Typography>
    </>
  )
}

export default DifferenceValue
