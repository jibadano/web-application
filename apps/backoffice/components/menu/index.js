import React from 'react'
import { Box, Divider, Drawer, List, Fab } from '@mui/material'
import { useRouter } from 'lib/router'
import MenuIcon from '@mui/icons-material/Menu'
import MenuItem from './item'
import useMediaQuery from '@mui/material/useMediaQuery'
import UserProfile from '@backoffice/components/user/profile'
import Logo from '@components/app/brand/logo'

import LogOut from '../auth/logout'
import routes from './routes'

const Menu = ({ language, route }) => {
  const router = useRouter()
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const [open, setOpen] = React.useState()

  return (
    <>
      {mobile && (
        <Box position="fixed" top={0} right={0} p={2} zIndex={1}>
          <Fab
            sx={{ backgroundColor: 'common.white' }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </Fab>
        </Box>
      )}
      <Drawer
        anchor="left"
        PaperProps={{ sx: { width: 256 } }}
        onClose={() => mobile && setOpen()}
        open={mobile ? open : true}
        variant={mobile ? 'temporary' : 'persistent'}
      >
        <Box height="100%" width="100%" display="flex" flexDirection="column">
          <Box alignItems="center" display="flex" flexDirection="column" p={2}>
            <Logo />
          </Box>

          <Divider />
          <Box p={2}>
            <List dense>
              {routes.map((item) => (
                <MenuItem
                  selected={route == item.href}
                  href={item.href}
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                  onClick={() => setOpen()}
                />
              ))}
            </List>
          </Box>
          <Box
            justifyContent="flex-end"
            height="100%"
            display="flex"
            flexDirection="column"
          >
            <Box
              px={2}
              pb={2}
              display="flex"
              alignItems="center"
              onClick={() => setOpen()}
              sx={{ cursor: 'pointer' }}
            >
              <UserProfile />
            </Box>
            <Divider />
            <Box px={3} py={1} display="flex" alignItems="center">
              <Box flexGrow={1}>
                <LogOut />
              </Box>
              <Box>{language}</Box>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

export default Menu
