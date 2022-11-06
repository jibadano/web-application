import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import moment from 'moment'

const FormattedDate = ({ value, ...props }) => {
  const date = moment(value)
  return (
    <Box sx={{ display: 'flex' }} {...props}>
      <Tooltip title={date.format('DD/MM/YYYY')}>
        <Box>
          <Typography
            sx={{ margin: 0 }}
            disableGutters
            variant="h4"
            align="center"
          >
            {date.format('DD').toUpperCase()}
          </Typography>
          <Typography variant="body2" align="center">
            {date.format('MMM').toUpperCase()}
          </Typography>
        </Box>
      </Tooltip>
    </Box>
  )
}

export default FormattedDate
