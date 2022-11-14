import React from 'react'
import { useTranslation } from 'lib/i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FadeOnScreen from '@components/app/animation/fadeOnScreen'
import ImageButton from 'image/button'
import Background from '@components/app/background'

const Home = () => {
  const { t } = useTranslation()

  return (
    <div style={{ overflow: 'hidden' }}>
      <Background>
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
                    <Typography variant="h2">{t('home.title')}</Typography>

                    <Typography variant="h6">
                      Familiarize yourself with our studio and course offering
                      by signing up for a complimentary drop-in class now.
                    </Typography>
                  </Box>
                  <Button
                    variant="text"
                    size="large"
                    color="secondary"
                    onClick={() => alert('hola')}
                  >
                    {t('setAnAppointment')}
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Background>
      <Box
        sx={{
          backgroundColor: 'secondary.main',
          py: 6
        }}
      >
        {' '}
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Typography variant="h4">Upcoming Classes</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FadeOnScreen>
                <ImageButton src="https://res.cloudinary.com/do0ixrz3u/image/upload/v1666373938/web-application/blog3_hlfuyb.jpg">
                  Yoga Aerobics
                </ImageButton>
              </FadeOnScreen>
            </Grid>
            <Grid item xs={12} md={6}>
              <FadeOnScreen index={1}>
                <ImageButton
                  index={1}
                  src="https://res.cloudinary.com/do0ixrz3u/image/upload/v1666373939/web-application/classes3_i7sqbd.jpg"
                >
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
      </Box>
      <Box
        sx={{
          backgroundColor: 'primary.dark',
          py: 12
        }}
      >
        {' '}
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
      </Box>
      <div
        style={{
          background:
            'url(https://res.cloudinary.com/do0ixrz3u/image/upload/v1666373939/web-application/background2_vl1lfz.jpg)',
          width: '100%',
          height: '100vh',
          backgroundSize: 'cover'
        }}
      >
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
      </div>
    </div>
  )
}
export default Home
