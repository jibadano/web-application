import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Logo from '../brand/logo'
import Menu from '../menu'

const Header = ({ window }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200,
    target: window ? window() : undefined
  })

  return (
    <AppBar
      sx={{
        zIndex: 1201,
        transition: 'padding 300s, background-color 250ms',
        py: { sm: 0, md: 1 },
        px: { sm: 0, md: 10 },
        backgroundColor: trigger ? 'secondary.main' : 'transparent'
      }}
      elevation={trigger ? 12 : 0}
    >
      <Toolbar>
        <Logo />
        <Menu />
      </Toolbar>
    </AppBar>
  )
}

export default Header
