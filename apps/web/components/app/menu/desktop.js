import React from 'react'
import { makeStyles } from '@mui/styles'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

import Language from '@jibadano/language'

import { useTranslation } from 'common-lib/i18next'
import Button from '@mui/material/Button'

const useStyles = makeStyles((theme) => ({
  tab: { minWidth: 'auto', letterSpacing: 1.5 }
}))

const MenuDesktop = ({ menuItems = [], route, onChange }) => {
  const classes = useStyles()
  const { t } = useTranslation()

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
          <Tab key={value} className={classes.tab} label={t(name)} />
        ))}
      </Tabs>
      <Box px={2}>
        <Language />
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
