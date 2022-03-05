import React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    '& > *': {
      marginBottom: theme.spacing(4)
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3)
    }
  }
}))

const Container = (props) => {
  const classes = useStyles()

  return <div className={classes.root} {...props} />
}

export default Container
