import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

import { useTranslation } from 'lib/i18next'
import Button from '@mui/material/Button'
import Language from '@components/app/language'

const MenuDesktop = ({ menuItems = [], route, onChange }) => {
  const { t, i18n } = useTranslation()

  const handleChange = (_, i) => menuItems[i] && onChange(menuItems[i].value)
  const value = menuItems.findIndex(({ value }) => value == route)
  return (
    <Box position="absolute" display="flex" alignItems="center" right={6}>
      <Tabs
        value={value != -1 && value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        {menuItems.map(({ name, value, badge }) => (
          <Tab
            key={value}
            sx={{ minWidth: 'auto', letterSpacing: 1.5 }}
            label={t(name)}
          />
        ))}
      </Tabs>
      <Box px={2}>
        <Language i18n={i18n} />
      </Box>
      <Box px={2}>
        <Button variant="contained" color="secondary">
          Book a class
        </Button>
      </Box>
    </Box>
  )
}

export default MenuDesktop
