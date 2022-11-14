import React from 'react'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'

import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'

import MenuIcon from '@mui/icons-material/Menu'
import Logo from '../brand/logo'
import { useTranslation } from 'lib/i18next'
import Language from '@components/app/language'

const MenuMobile = ({ menuItems = [], onChange }) => {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = React.useState(false)

  return (
    <Box sx={{ position: 'absolute', right: 2, zIndex: 1210 }}>
      <IconButton color="primary" size="large" onClick={() => setOpen(!open)}>
        <MenuIcon fontSize="large" />
      </IconButton>
      <SwipeableDrawer
        anchor="top"
        onClose={() => setOpen()}
        sx={{ position: 'absolute', right: 2 }}
        fullScreen
        open={open}
      >
        <Box sx={{ backgroundColor: 'primary.main' }}>
          <Box textAlign="right" px={2}>
            <IconButton size="large" onClick={() => setOpen()}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </Box>
          <Box textAlign="center" m={2}>
            <Logo color="secondary" />
          </Box>
          <Box textAlign="center">
            {menuItems.map(({ name, value, badge }) => (
              <Box width="100%" key={value}>
                <Button
                  variant="text"
                  size="large"
                  key={value}
                  onClick={() => {
                    setOpen()
                    onChange(value)
                  }}
                >
                  {t(name)}
                </Button>
              </Box>
            ))}
          </Box>
          <Box p={2} textAlign="center">
            <Language i18n={i18n} />
          </Box>
        </Box>
      </SwipeableDrawer>
    </Box>
  )
}

export default MenuMobile
