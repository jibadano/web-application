import React from 'react'
import { useTranslation } from 'common-lib/i18next'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import FadeOnScreen from 'components/app/animation/fadeOnScreen'

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundColor: theme.palette.secondary.main,
    minHeight: '40vh',
    display: 'flex',
    alignItems: 'flex-end'
  },
  section2: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(16, 0)
  }
}))

const About = () => {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <div style={{ overflow: 'hidden' }}>
      <div className={classes.section}>
        <Container maxWidth="lg">
          <Typography variant="h2">About</Typography>
        </Container>
      </div>
      <div className={classes.section2}>
        <Container maxWidth="lg">
          <Grid container spacing={8}>
            <Grid item xs={12} md={6}>
              <FadeOnScreen>
                <img src="./images/classes2.jpg" width="100%" />
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
      </div>

      <div width="100%" height="100vh" src="/images/classes.jpg">
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
