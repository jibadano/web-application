import React from 'react'

import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

const Carousel = ({ children, height, ...props }) => {
  const [nav, setNav] = React.useState(0)

  if (!children) return ''

  let images = children instanceof Array ? children : [children]

  return (
    <Box height={height || '80vh'} width="100%" position="relative">
      <Box
        width="100%"
        height="100%"
        display="flex"
        alignItems="flex-end"
        sx={{
          borderRadius: (theme) => theme.shape.borderRadius,
          background: '#222'
        }}
      >
        {images.map((image, i) => (
          <Box
            key={i}
            width="100%"
            height="100%"
            display={nav == i ? 'flex' : 'none'}
            alignItems="flex-end"
            justifyContent="center"
          >
            {image}
          </Box>
        ))}
        <Box
          p={2}
          width="100%"
          position="absolute"
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
        >
          <Box p={2}>
            <Fab
              size="small"
              disabled={!nav}
              onClick={() => setNav((nav) => --nav)}
            >
              <ChevronLeftIcon />
            </Fab>
          </Box>
          <Box p={2}>
            <Fab
              size="small"
              disabled={nav == images.length - 1}
              onClick={() => setNav((nav) => ++nav)}
            >
              <ChevronRightIcon />
            </Fab>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Carousel
