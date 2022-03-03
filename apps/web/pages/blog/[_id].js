import React from 'react'
import { useTranslation } from 'lib/i18next'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundColor: theme.palette.secondary.main,
    minHeight: '20vh',
    display: 'flex',
    alignItems: 'flex-end'
  },
  section2: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(16, 0)
  },
  section3: {
    backgroundColor: theme.palette.primary.dark,
    padding: theme.spacing(16, 0)
  }
}))

const Classes = () => {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <div style={{ overflow: 'hidden' }}>
      <div className={classes.section}></div>
      <div className={classes.section2}>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center" height="100%">
            <Box>
              <Box my={4}>
                <Typography variant="h6" color="textPrimary">
                  Aug 28
                </Typography>
                <Typography variant="h2" color="textPrimary">
                  Feeding your Soul
                </Typography>
              </Box>
              <Box my={8}>
                <Typography color="textPrimary" gutterBottom>
                  It all begins with an idea. Maybe you want to launch a
                  business. Maybe you want to turn a hobby into something more.
                  Or maybe you have a creative project to share with the world.
                  Whatever it is, the way you tell your story online can make
                  all the difference.
                </Typography>
                <Typography color="textPrimary" gutterBottom>
                  Don’t worry about sounding professional. Sound like you. There
                  are over 1.5 billion websites out there, but your story is
                  what’s going to separate this one from the rest. If you read
                  the words back and don’t hear your own voice in your head,
                  that’s a good sign you still have more work to do. Be clear,
                  be confident and don’t overthink it. The beauty of your story
                  is that it’s going to continue to evolve and your site can
                  evolve with it.
                </Typography>
                <Typography color="textPrimary" gutterBottom>
                  Your goal should be to make it feel right for right now. Later
                  will take care of itself. It always does
                </Typography>{' '}
              </Box>
              <Box>
                <img src="/images/blog.jpg" width="100%" />
              </Box>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  )
}

export default Classes
