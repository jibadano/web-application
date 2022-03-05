import React from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  root: {
    overflow: 'hidden',
    padding: 0
  },
  image: ({ blur, scale, brightness }) => ({
    transition: 'transform 400ms, filter 400ms',
    filter: `brightness(${brightness})`,
    '&:hover': {
      filter: `blur(${blur}) brightness(${brightness})`,
      transform: `scale(${scale})`
    }
  })
}))

const ImageButton = ({
  src,
  blur = '2px',
  scale = 1.035,
  brightness = 1,
  children,
  ...props
}) => {
  const classes = useStyles({ blur, scale, brightness })

  return (
    <Button className={classes.root} fullWidth {...props}>
      <img className={classes.image} src={src} width="100%" height="auto" />
      <Box
        position="absolute"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {children}
      </Box>
    </Button>
  )
}

export default ImageButton
