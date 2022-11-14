import React from 'react'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import config from '@jibadano/config'
import { useTranslation } from 'lib/i18next'
import Box from '@mui/material/Box'

const Copyright = () => {
  const { t } = useTranslation()
  return (
    <Box sx={{ opacity: 0.7 }}>
      <Typography variant="body2" color="textPrimary" style={{ fontSize: 11 }}>
        {t('brand.copyright.slogan')}
      </Typography>
      <Typography variant="body2" color="textPrimary" style={{ fontSize: 11 }}>
        {'Copyright © '}
        <Link color="inherit" href="/">
          {config.get('..settings.app.name')}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  )
}

export default Copyright
