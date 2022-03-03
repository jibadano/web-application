import React from 'react'
import { makeStyles } from '@mui/styles'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'

import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'

import MenuIcon from '@mui/icons-material/Menu'
import Language from '@jibadano/language'
import Logo from '../brand/logo'
import { useTranslation } from 'lib/i18next'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    right: theme.spacing(2)
  },
  appBar: {
    backgroundColor: theme.palette.primary.main,
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  button: {
    float: 'right'
  }
}))

const MenuMobile = ({ menuItems = [], route, onChange }) => {
  const { t, i18n } = useTranslation()

  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  return (
    <div className={classes.root}>
      <IconButton color="primary" size="large" onClick={() => setOpen(!open)}>
        <MenuIcon fontSize="large" />
      </IconButton>
      <SwipeableDrawer
        anchor="top"
        onClose={() => setOpen()}
        className={classes.root}
        fullScreen
        open={open}
      >
        <Box className={classes.appBar}>
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
            <Language style={{ color: '#333' }} i18n={i18n} />
          </Box>
        </Box>
      </SwipeableDrawer>
    </div>
  )
}

export default MenuMobile
