import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'

import { TableCell, TableRow } from '@mui/material'

import Skeleton from '@mui/material/Skeleton'
import IconButton from '@mui/material/IconButton'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

export const DataTableItemSkeleton = ({ config = [], button }) => {
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  return (
    <TableRow>
      {config.map(({ hiddenMobile }, i) => {
        if (hiddenMobile && mobile) return
        return (
          <TableCell key={i} sx={{ padding: 1.5, border: 'none' }}>
            <Skeleton variant="text" />
          </TableCell>
        )
      })}
      {!mobile && button && (
        <TableCell sx={{ border: 'none' }} align="right">
          <IconButton disabled size="small">
            <ChevronRightIcon />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  )
}
const DataTableItem = ({ config, onClick, values }) => {
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  return (
    <TableRow hover style={{ cursor: onClick && 'pointer' }} onClick={onClick}>
      {values.map((value, i) => {
        if (config[i].hiddenMobile && mobile) return

        return (
          <TableCell sx={{ border: 'none' }} {...config[i].props}>
            {value}
          </TableCell>
        )
      })}
      {!mobile && onClick && (
        <TableCell align="right" sx={{ border: 'none' }}>
          <IconButton size="small">
            <ChevronRightIcon />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  )
}

export default DataTableItem
