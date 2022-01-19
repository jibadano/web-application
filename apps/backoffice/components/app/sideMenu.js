import React from 'react'

import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Drawer from '@mui/material/Drawer'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { isMobile } from 'lib/utils'

const SideMenu = ({ children, swipeable, title = 'Menu', defaultOpen }) => {
  const [open, setOpen] = React.useState(defaultOpen)
  const mobile = isMobile()
  if (!mobile) return children
  const Component = swipeable ? SwipeableDrawer : Drawer
  return (
    <>
      <Box position="fixed" zIndex={1} bottom={0} p={2} left={0} width="100%">
        <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={() => setOpen(true)}
        >
          {title}
        </Button>
      </Box>
      <Component
        anchor="bottom"
        open={open}
        onClose={() => setOpen()}
        onOpen={() => setOpen(true)}
        onClick={() => setOpen()}
      >
        {children}
      </Component>
    </>
  )
}

export default SideMenu
