import { useQuery, useMutation, gql } from '@apollo/client'

const TRAFFIC = gql`
  query traffic {
    traffic {
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

export const useTraffic = () =>
  useQuery(TRAFFIC, {
    context: {
      clientName: 'system'
    }
  })
