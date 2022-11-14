import React from 'react'
import { useTranslation } from 'lib/i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import FadeOnScreen from '@components/app/animation/fadeOnScreen'

const About = () => {
  const { t } = useTranslation()

  return (
    <div style={{ overflow: 'hidden' }}>
      <Box
        sx={{
          backgroundColor: 'secondary.main',
          minHeight: '40vh',
          display: 'flex',
          alignItems: 'flex-end'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2">About</Typography>
        </Container>
      </Box>
      <Box
        sx={{
          backgroundColor: 'primary.main',
          py: 16
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={8}>
            <Grid item xs={12} md={6}>
              <FadeOnScreen>
                <img
                  src="https://res.cloudinary.com/do0ixrz3u/image/upload/v1666373939/web-application/classes2_xuktna.webp"
                  width="100%"
                />
              </FadeOnScreen>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                display="flex"
                alignItems="center"
                height="100%"
                ml={{ xs: 0, md: 6 }}
              >
                <Box>
                  <Typography variant="h5" color="textPrimary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam.
                  </Typography>
                  <Typography color="textPrimary">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum. Photography by Aro Ha
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <div
        style={{
          background:
            'url(https://res.cloudinary.com/do0ixrz3u/image/upload/v1666373939/web-application/classes_rvupcx.jpg)',
          backgroundSize: 'cover',
          width: '100%',
          height: '100vh'
        }}
      >
        <Container maxWidth="lg" style={{ height: '100%' }}>
          <Box
            display="flex"
            height="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Box width="100%">
              <Typography variant="h4">
                “This is the perfect place for a testimonial, quote or
                statement.”
              </Typography>
              <Box mt={3}>
                <Typography variant="h6">— Quote Source</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  )
}
export default About
