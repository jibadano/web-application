import React from 'react'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'

const MenuItem = ({ onClick, selected, href, icon: Icon, title, ...rest }) => (
  <ListItem
    selected={selected}
    sx={{ display: 'flex' }}
    disableGutters
    {...rest}
  >
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
      <span style={{ marginRight: 'auto' }}>{title}</span>
    </Button>
  </ListItem>
)

export default MenuItem
