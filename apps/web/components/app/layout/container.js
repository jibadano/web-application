import React from 'react'
import Container from '@mui/material/Container'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(10),
    '& > *': {
      margin: theme.spacing(6, 0)
    }
  }
}))

const WrapperContainer = (props) => {
  const classes = useStyles()

  return (
    <Container
      {...props}
      className={classes.root}
      maxWidth="lg"
      disableGutters
    />
  )
}

export default WrapperContainer
