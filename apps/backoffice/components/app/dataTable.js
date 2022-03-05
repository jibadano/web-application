import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Paper,
  TableContainer,
  Box
} from '@mui/material'
import DataTableItem, { DataTableItemSkeleton } from './dataTableItem'
import Pagination from './pagination'

const DataTableHeadCell = ({ onClick, sort, value, children, ...props }) => {
  const active = Boolean(sort && sort.endsWith(value))
  const direction = active && sort.startsWith('-') ? 'desc' : 'asc'
  return onClick ? (
    <TableCell variant="head" {...props}>
      <Tooltip enterDelay={300} title="Sort">
        <TableSortLabel
          onClick={() => {
            if (!active) onClick(`-${value}`)
            else if (active && direction == 'desc') onClick(value)
            else if (active && direction == 'asc') onClick()
          }}
          active={active}
          direction={direction}
        >
          {children}
        </TableSortLabel>
      </Tooltip>
    </TableCell>
  ) : (
    <TableCell variant="head" {...props}>
      {children}
    </TableCell>
  )
}

const DataTable = ({
  config,
  rows,
  loading,
  sort,
  onSortChange,
  page,
  onPageChange,
  hasMore,
  size,
  head,
  footer,
  ...props
}) => {
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const button = rows.some(({ onClick }) => Boolean(onClick))
  return (
    <TableContainer component={Paper} {...props}>
      {head}
      <Table size={size}>
        <TableHead>
          <TableRow>
            {config.map(({ title, _id, sortable, hiddenMobile, props }) => {
              if (hiddenMobile && mobile) return
              return (
                <DataTableHeadCell
                  key={_id}
                  onClick={sortable && onSortChange}
                  sort={sort}
                  value={_id}
                  {...props}
                >
                  {title}
                </DataTableHeadCell>
              )
            })}

            {!mobile && button && <DataTableHeadCell align="right" />}
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            <React.Fragment>
              <DataTableItemSkeleton config={config} button={button} />
              <DataTableItemSkeleton config={config} button={button} />
              <DataTableItemSkeleton config={config} button={button} />
              <DataTableItemSkeleton config={config} button={button} />
              <DataTableItemSkeleton config={config} button={button} />
              <DataTableItemSkeleton config={config} button={button} />
            </React.Fragment>
          ) : (
            rows.map((row) => (
              <DataTableItem config={config} key={row._id} {...row} />
            ))
          )}
        </TableBody>
      </Table>
      {onPageChange && (
        <Box p={size == 'small' ? 1 : 2}>
          <Pagination
            size={size}
            page={page || 0}
            setPage={onPageChange}
            hasMore={hasMore}
          />
        </Box>
      )}
      {footer}
    </TableContainer>
  )
}

export default DataTable
