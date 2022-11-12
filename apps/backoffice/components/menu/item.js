import React from 'react'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import Link from 'next/link'
import { useTranslation } from 'lib/i18next'

const MenuItem = ({ onClick, selected, href, icon: Icon, title, ...rest }) => {
  const { t } = useTranslation()
  return (
    <ListItem
      selected={selected}
      sx={{ display: 'flex' }}
      disableGutters
      {...rest}
    >
      <Link href={href}>
        <Button
          sx={{
            color: 'text.secondary',
            justifyContent: 'flex-start',
            alignItems: 'center',
            px: 2,
            width: '100%',
            textTransform: 'none'
          }}
          onClick={onClick}
        >
          {Icon && (
            <Box
              sx={{
                mr: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Icon size="20" />
            </Box>
          )}
          <span style={{ marginRight: 'auto' }}>{t(title)}</span>
        </Button>
      </Link>
    </ListItem>
  )
}

export default MenuItem
