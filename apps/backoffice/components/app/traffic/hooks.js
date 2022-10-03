import { useQuery, gql } from '@apollo/client'

const TRAFFIC = gql`
  query traffic {
    traffic {
      ip
      device
      origin
      geolocation {
        city
        country
        latitude
        longitude
        region
      }
    }
  }
`

export const useTraffic = () =>
  useQuery(TRAFFIC, {
    context: {
      clientName: 'sys'
    }
  })

const TRAFFIC_STATS = gql`
  query trafficStats {
    trafficStats {
      current
      previous
      total
      device {
        _id
        count
      }
      source {
        _id
        count
      }
    }
  }
`

export const useTrafficStats = () =>
  useQuery(TRAFFIC_STATS, {
    context: {
      clientName: 'sys'
    }
  })
