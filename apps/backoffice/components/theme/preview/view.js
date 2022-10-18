import React from 'react'
import MobileIcon from '@mui/icons-material/PhoneIphone'
import DesktopIcon from '@mui/icons-material/Laptop'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

const ThemePreview = ({ view, onChange }) => {
  return (
    <ToggleButtonGroup
      value={view}
      exclusive
      onChange={(e, view) => onChange(view)}
      aria-label="View"
    >
      <ToggleButton value="desktop" aria-label="Desktop">
        <DesktopIcon />
      </ToggleButton>
      <ToggleButton value="mobile" aria-label="Mobile">
        <MobileIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default ThemePreview
