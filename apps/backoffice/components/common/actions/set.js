import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import useMediaQuery from '@mui/material/useMediaQuery'

const ActionsSet = ({ set, fullWidth }) => {
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  if (!set || !set.length) return ''
  set = set.filter(({ display }) => display !== false)

  if (!set.length) return ''

  return (
    <Box display={{ xs: 'block', md: 'flex' }}>
      {set.map((props, i) => (
        <Box key={i} pr={{ xs: 0, md: Boolean(i != set.length - 1) && 2 }}>
          <Button fullWidth={Boolean(fullWidth && mobile)} {...props} />
        </Box>
      ))}
    </Box>
  )
}

export default ActionsSet
