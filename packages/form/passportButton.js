import React from 'react'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'

const images = {
  google:
    'https://res.cloudinary.com/cloud-polarbear/image/upload/v1601576616/google.svg',
  facebook:
    'https://res.cloudinary.com/cloud-polarbear/image/upload/v1601576616/facebook.svg'
}

export default ({ integration, secureUrl }) => {
  return (
    <Link
      tabIndex={32}
      style={{ margin: 'auto 0' }}
      href={`${secureUrl}/auth/${integration}`}
    >
      <IconButton tabIndex={32}>
        <img width="18" height="18" src={images[integration]} />
      </IconButton>
    </Link>
  )
}
