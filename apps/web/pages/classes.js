import React from 'react'
import { useTranslation } from 'lib/i18next'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
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
      <div className={classes.section}>
        <Container maxWidth="lg">
          <Typography variant="h2">Classes</Typography>
        </Container>
      </div>
      <div className={classes.section2}>
        <Container maxWidth="lg">
          <FadeOnScreen>
            <Grid container spacing={8}>
              <Grid item xs={12} md={6}>
                <img src="./images/blog3.jpg" width="100%" />
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
                      Example Class
                    </Typography>
                    <Typography color="textPrimary">
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum. Photography
                      by Aro Ha
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </FadeOnScreen>
        </Container>
      </div>
      <div className={classes.section2}>
        <Container maxWidth="lg">
          <FadeOnScreen>
            <Grid container spacing={8} direction="row-reverse">
              <Grid item xs={12} md={6}>
                <img src="./images/classes3.jpeg" width="100%" />
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
                      Example Class
                    </Typography>
                    <Typography color="textPrimary">
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum. Photography
                      by Aro Ha
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </FadeOnScreen>
        </Container>
      </div>
      <div className={classes.section2}>
        <Container maxWidth="lg">
          <FadeOnScreen>
            <Grid container spacing={8}>
              <Grid item xs={12} md={6}>
                <img src="./images/background.jpg" width="100%" />
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
                      Example Class
                    </Typography>
                    <Typography color="textPrimary">
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum. Photography
                      by Aro Ha
                    </Typography>
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
