import React from 'react'
import { useTraffic } from './hooks'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'

import ReactMapGL, { Marker } from 'react-map-gl'
import LocationIcon from '@mui/icons-material/LocationOn'

const Instructors = () => {
  const [viewport, setViewport] = React.useState({
    zoom: 1
  })

  const { data, loading } = useTraffic()
  if (loading || !data || !data.traffic) return 'loading'
  return (
    <Box
      width="100%"
      height="552px"
      overflow="hidden"
      sx={{
        borderRadius: (theme) => theme.shape.borderRadius + 'px',
        overflow: 'hidden'
      }}
    >
      <ReactMapGL
        mapboxApiAccessToken="pk.eyJ1IjoiamliYWRhbm8iLCJhIjoiY2txM3hqNjJ2MDlvNjJ4bnRuaG1tcXNwMSJ9.DDxQOB644OCmZmER23TvlA"
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        {data.traffic.map((traffic) => (
          <Marker
            latitude={traffic.geolocation.latitude}
            longitude={traffic.geolocation.longitude}
          >
            <Box ml="-12px" mt="-24px">
              <Tooltip
                title={`${traffic.geolocation.city} ${traffic.geolocation.region} ${traffic.geolocation.country} `}
              >
                <LocationIcon />
              </Tooltip>
            </Box>
          </Marker>
        ))}
      </ReactMapGL>
    </Box>
  )
}
export default Instructors
