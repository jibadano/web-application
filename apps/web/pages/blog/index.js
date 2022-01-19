import React from 'react'
import { useTranslation } from 'lib/i18next'
import { useRouter } from 'lib/router'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import FadeOnScreen from 'fade-on-screen'
import Button from '@mui/material/Button'

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundColor: theme.palette.secondary.main,
    minHeight: '40vh',
    display: 'flex',
    alignItems: 'flex-end'
  },
  section2: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(16, 0),
    cursor: 'pointer'
  },
  section3: {
    backgroundColor: theme.palette.primary.dark,
    padding: theme.spacing(16, 0)
  }
}))

const Classes = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  const router = useRouter()
  return (
    <div style={{ overflow: 'hidden' }}>
      <div className={classes.section}>
        <Container maxWidth="lg">
          <Typography variant="h2">Blog</Typography>
        </Container>
      </div>
      <div className={classes.section2} onClick={() => router.push('/blog/1')}>
        <Container maxWidth="lg">
          <FadeOnScreen>
            <Grid container spacing={8}>
              <Grid item xs={12} md={5}>
                <img src="./images/blog.jpg" width="100%" />
              </Grid>
              <Grid item xs={12} md={7}>
                <Box
                  display="flex"
                  alignItems="center"
                  height="100%"
                  ml={{ xs: 0, md: 6 }}
                >
                  <Box>
                    <Typography variant="h3" color="textPrimary">
                      Feeding your Soul
                    </Typography>
                    <Typography color="textPrimary">
                      Maybe you want to turn a hobby into something more. Or
                      maybe you have a creative project to share with the world.
                      Whatever it is, the way you tell your story online can
                      make all the difference.
                    </Typography>
                    <Typography color="textPrimary">8/28/19</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </FadeOnScreen>
        </Container>
      </div>
      <div className={classes.section2} onClick={() => router.push('/blog/1')}>
        <Container maxWidth="lg">
          <FadeOnScreen>
            <Grid container spacing={8} direction="row-reverse">
              <Grid item xs={12} md={5}>
                <img src="./images/blog2.jpg" width="100%" />
              </Grid>
              <Grid item xs={12} md={7}>
                <Box
                  display="flex"
                  alignItems="center"
                  height="100%"
                  mr={{ xs: 0, md: 6 }}
                >
                  <Box>
                    <Typography variant="h3" color="textPrimary">
                      Summer Retreat 2019
                    </Typography>
                    <Typography color="textPrimary">
                      Maybe you want to turn a hobby into something more. Or
                      maybe you have a creative project to share with the world.
                      Whatever it is, the way you tell your story online can
                      make all the difference.
                    </Typography>
                    <Typography color="textPrimary">6/4/19</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </FadeOnScreen>
        </Container>
      </div>
      <div className={classes.section2} onClick={() => router.push('/blog/1')}>
        <Container maxWidth="lg">
          <FadeOnScreen>
            <Grid container spacing={8}>
              <Grid item xs={12} md={5}>
                <img src="./images/classes.jpg" width="100%" />
              </Grid>
              <Grid item xs={12} md={7}>
                <Box
                  display="flex"
                  alignItems="center"
                  height="100%"
                  ml={{ xs: 0, md: 6 }}
                >
                  <Box>
                    <Typography variant="h3" color="textPrimary">
                      Yoga Reimagined
                    </Typography>
                    <Typography color="textPrimary">
                      Maybe you want to turn a hobby into something more. Or
                      maybe you have a creative project to share with the world.
                      Whatever it is, the way you tell your story online can
                      make all the difference.
                    </Typography>
                    <Typography color="textPrimary">6/4/19</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </FadeOnScreen>
        </Container>
      </div>
      <div className={classes.section3}>
        <Container maxWidth="sm">
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box textAlign="center">
              <Box my={4}>
                <Typography variant="h3">Book a Class</Typography>{' '}
              </Box>

              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation.{' '}
              </Typography>
              <Box mt={4}>
                <Button size="large" variant="contained" color="primary">
                  Book a Class
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  )
}

export default Classes
