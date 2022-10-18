import React from 'react'
import { Box, Typography } from '@mui/material'

import Actions from '@backoffice/components/common/actions'

import RemoveIcon from '@mui/icons-material/Close'
import FilterIcon from '@mui/icons-material/FilterList'
import Collapse from '@mui/material/Collapse'
import LogFilterForm from './form'
import Chip from '@mui/material/Chip'

const LogFilter = ({ onChange = () => {}, filters }) => {
  const [open, setOpen] = React.useState()
  const hasFilter = Boolean(Object.keys(filters).length)

  return (
    <Box sx={{ mx: 3, my: 1 }}>
      <Actions
        left={
          <Box sx={{ flexGrow: 1, '& > *': { mr: 2 } }}>
            {hasFilter &&
              Object.keys(filters).map((key) => (
                <Chip
                  key={key}
                  label={
                    <Typography variant="caption">
                      <b>{key}</b> {filters[key]}
                    </Typography>
                  }
                  onDelete={() => {
                    delete filters[key]
                    onChange({ ...filters })
                  }}
                />
              ))}
          </Box>
        }
        right={[
          {
            display: Boolean(hasFilter),
            startIcon: <RemoveIcon />,
            children: 'Clear',
            onClick: () => onChange({}),
            variant: 'text',
            size: 'small',
            disableElevation: true
          },
          {
            startIcon: <FilterIcon />,
            onClick: () => setOpen((open) => !open),
            children: 'Filters',
            variant: hasFilter ? 'contained' : 'text',
            size: 'small'
          }
        ]}
      />
      <Collapse in={open} mountOnEnter>
        <LogFilterForm filters={filters} onChange={onChange} />
      </Collapse>
    </Box>
  )
}

export default LogFilter
