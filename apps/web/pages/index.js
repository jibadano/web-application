import React from 'react'
import { useTranslation } from 'lib/i18next'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Background } from '@jibadano/components'
import FadeOnScreen from 'fade-on-screen'
import ImageButton from '@jibadano/image/button'

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(6, 0)
  },
  section2: {
    backgroundColor: theme.palette.primary.dark,
    padding: theme.spacing(12, 0)
  }
}))

const Home = () => {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <div style={{ overflow: 'hidden' }}>
      <Background overlay height="100vh" image="/images/background.jpg">
        <Container maxWidth="lg" style={{ height: '100%' }}>
          <Box
            display="flex"
            alignItems="flex-end"
            height={{ xs: '100%', md: '90%' }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={7}>
                <div>
                  <Box p={1}>
                    <Typography variant="h2">
                      Taking care of your mind, body and soul.
                    </Typography>

                    <Typography variant="h6">
                      Familiarize yourself with our studio and course offering
                      by signing up for a complimentary drop-in class now.
                    </Typography>
                  </Box>
                  <Button variant="text" size="large" color="secondary">
                    Book a Class
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Background>
      <div className={classes.section}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Typography variant="h4">Upcoming Classes</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FadeOnScreen>
                <ImageButton src="./images/blog3.jpg">
                  Yoga Aerobics
                </ImageButton>
              </FadeOnScreen>
            </Grid>
            <Grid item xs={12} md={6}>
              <FadeOnScreen index={1}>
                <ImageButton index={1} src="./images/classes3.jpeg">
                  Instructor Training
                </ImageButton>
              </FadeOnScreen>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">
                Besides our regular schedule, we also frequently host visiting
                teachers and speakers.
              </Typography>
              <Box py={3}>
                <Button size="large" variant="contained">
                  View More
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className={classes.section2}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={9}>
              <Box display="flex" alignItems="center">
                <Typography variant="h4">
                  With an emphasis on breathing techniques and meditation, we
                  promote thoughtful and reflexive yoga to promote both physical
                  and mental well-being.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box display="flex" alignItems="center">
                <Box>
                  <Typography>
                    Learn more about our studio and philosophy around yoga.
                  </Typography>
                  <Box pt={3}>
                    <Button size="large" variant="contained" color="primary">
                      Learn More
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Background overlay height="100vh" image="/images/background2.jpg">
        <Container maxWidth="md" style={{ height: '100%' }}>
          <Box
            display="flex"
            height="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Box width="100%">
              <Typography align="center" variant="h4">
                Subscribe to Our Newsletter
              </Typography>
              <Box mt={2} mb={6}>
                <Typography align="center" variant="body1">
                  Sign up to receive news and updates.
                </Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <TextField fullWidth placeholder="First Name" />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField fullWidth placeholder="Last Name" />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField fullWidth placeholder="E-mail" />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button
                    size="large"
                    fullWidth
                    color="primary"
                    variant="contained"
                  >
                    Sign up
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Background>
    </div>
  )
}
export default Home
