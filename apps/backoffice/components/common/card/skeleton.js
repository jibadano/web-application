import React from 'react'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: ({ height = '100%' }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height,
    padding: theme.spacing(4)
  }),
  title: { display: 'flex', paddingBottom: theme.spacing(2) },
  avatar: { paddingRight: theme.spacing(2) },
  text: { flexGrow: 1 },

  buttons: { display: 'flex', justifyContent: 'flex-end' }
}))

const CardSkeleton = (props) => {
  const classes = useStyles(props)
  return (
    <Paper className={classes.root}>
      <div className={classes.text}>
        <div className={classes.title}>
          <div className={classes.avatar}>
            <Skeleton variant="rounded" height={60} width={60} />
          </div>

          <Skeleton variant="text" height={60} width="70%" />
        </div>
        <Skeleton variant="text" height={30} />
        <Skeleton variant="text" height={30} />
        <Skeleton variant="text" height={30} />
        <Skeleton variant="text" height={30} width="40%" />
      </div>
      <div className={classes.buttons}>
        <Skeleton variant="text" height={50} width={120} />
      </div>
    </Paper>
  )
}

export default CardSkeleton
