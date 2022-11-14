import React from 'react'
import { useTranslation } from 'lib/i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import ReactMapGL, { Marker } from 'react-map-gl'
import LocationIcon from '@mui/icons-material/LocationOn'

const Instructors = () => {
  const { t } = useTranslation()
  const [viewport, setViewport] = React.useState({
    latitude: 42.694923,
    longitude: 23.320802,
    zoom: 12
  })
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
          <Typography variant="h2">Location</Typography>
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
            <Grid item xs={12} md={5}>
              <Box height="100%" mr={{ xs: 0, md: 6 }}>
                <Box>
                  <Typography variant="h4" color="textPrimary">
                    123 Demo Street Lake Tahoe, CA
                  </Typography>
                  <Typography color="textPrimary">
                    The following text is placeholder known as “lorem ipsum,”
                    which is scrambled Latin used by designers to mimic real
                    copy. Lorem ipsum dolor sit amet nullam vel ultricies metus,
                    at tincidunt.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box height="80vh" width="100%">
                <ReactMapGL
                  mapboxApiAccessToken="pk.eyJ1IjoiamliYWRhbm8iLCJhIjoiY2txM3hqNjJ2MDlvNjJ4bnRuaG1tcXNwMSJ9.DDxQOB644OCmZmER23TvlA"
                  {...viewport}
                  width="100%"
                  height="100%"
                  onViewportChange={(viewport) => setViewport(viewport)}
                >
                  <Marker latitude={42.694923} longitude={23.320802}>
                    <Box ml="-12px" mt="-24px">
                      <LocationIcon />
                    </Box>
                  </Marker>
                </ReactMapGL>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  )
}
export default Instructors
