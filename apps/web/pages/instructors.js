import React from 'react'
import { useTranslation } from 'lib/i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import FadeOnScreen from '@components/app/animation/fadeOnScreen'

const Instructors = () => {
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
          <Typography variant="h2">Instructors</Typography>
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
                  src="https://res.cloudinary.com/do0ixrz3u/image/upload/v1666373939/web-application/instructor_scepuv.jpg"
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
                  <Typography variant="h4" color="textPrimary">
                    First Name Last name
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
      <Box
        sx={{
          backgroundColor: 'primary.main',
          py: 16
        }}
      >
        {' '}
        <Container maxWidth="lg">
          <Grid container spacing={8} direction="row-reverse">
            <Grid item xs={12} md={6}>
              <FadeOnScreen>
                <img
                  src="https://res.cloudinary.com/do0ixrz3u/image/upload/v1666373939/web-application/instructor2_o98qqz.jpg"
                  width="100%"
                />
              </FadeOnScreen>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                display="flex"
                alignItems="center"
                height="100%"
                mr={{ xs: 0, md: 6 }}
              >
                <Box>
                  <Typography variant="h4" color="textPrimary">
                    First Name Last name
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
    </div>
  )
}
export default Instructors
