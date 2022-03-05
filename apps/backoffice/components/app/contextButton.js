import React from 'react'
import Button from '@mui/material/Button'
import BackIcon from '@mui/icons-material/ChevronLeft'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Fade from '@mui/material/Fade'

const ContextButton = ({ icon, label }) => (
  <Button startIcon={<BackIcon />}>
    Back
    <Fade in={label} mountOnEnter>
      <Box paddingLeft={2}>
        <Chip
          label={label}
          color="primary"
          size="small"
          variant="outlined"
          icon={icon}
        />
      </Box>
    </Fade>
  </Button>
)

export default ContextButton
