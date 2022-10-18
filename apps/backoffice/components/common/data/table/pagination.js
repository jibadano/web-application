import React from 'react'
import { IconButton, Chip, Box } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

const Pagination = ({ page, setPage, hasMore, size }) => (
  <Box display="flex" justifyContent="center" alignItems="center">
    <IconButton size={size} disabled={!page} onClick={() => setPage(--page)}>
      <ChevronLeftIcon />
    </IconButton>
    <Chip
      size={size}
      color={page ? 'primary' : 'default'}
      label={page ? page + 1 : `Page ${page + 1}`}
    />
    <IconButton size={size} disabled={!hasMore} onClick={() => setPage(++page)}>
      <ChevronRightIcon />
    </IconButton>
  </Box>
)

export default Pagination
