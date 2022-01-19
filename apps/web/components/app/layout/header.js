import React from 'react'
import AppBar from '@mui/material/AppBar'
import { makeStyles } from '@mui/styles'
import Toolbar from '@mui/material/Toolbar'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Logo from '../brand/logo'
import Menu from '../menu'
const useStyles = makeStyles((theme) => ({
  appBar: ({ trigger }) => ({
    zIndex: 1201,
    transition: 'padding 300ms',
    padding: theme.spacing(1, 10),
    transition: 'background-color 250ms',
    backgroundColor: trigger ? theme.palette.secondary.main : 'transparent',
    [theme.breakpoints.down('xs')]: {
      padding: 0
    }
  })
}))

export default ({ window }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200,
    target: window ? window() : undefined
  })
  const classes = useStyles({ trigger })

  return (
    <AppBar className={classes.appBar} elevation={trigger ? 12 : 0}>
      <Toolbar>
        <Logo />
        <Menu />
      </Toolbar>
    </AppBar>
  )
}
