import React from 'react'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import Link from '@mui/material/Link'
import config from 'lib/config'
import { useTranslation } from 'lib/i18next'

const TITLE = config.get('settings.app.name')

const useStyles = makeStyles((theme) => ({
  footer: {
    opacity: 0.7
  },
  logo: {
    height: 8,
    width: 8,
    paddingLeft: 2
  }
}))

const Copyright = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <footer className={classes.footer}>
      <Typography variant="body2" color="textPrimary" style={{ fontSize: 11 }}>
        {t('brand.copyright.slogan')}
      </Typography>
      <Typography variant="body2" color="textPrimary" style={{ fontSize: 11 }}>
        {'Copyright © '}
        <Link color="inherit" href="/">
          {TITLE}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </footer>
  )
}

export default Copyright
