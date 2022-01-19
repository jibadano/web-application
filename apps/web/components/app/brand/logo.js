import React from 'react'
import config from 'config'
import { useRouter } from 'lib/router'
import Typography from '@mui/material/Typography'

const Logo = (props) => {
  const router = useRouter()
  return (
    <Typography
      style={{ cursor: 'pointer' }}
      onClick={() => router.push('/')}
      variant="h4"
      {...props}
    >
      {config.get('settings.app.name')}
    </Typography>
  )
}

export default Logo
