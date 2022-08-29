import { useQuery, gql } from '@apollo/client'
const PAGE_SIZE = 12

const TRACES = gql`
  query traces(
    $_id: ID
    $operation: String
    $dateFrom: String
    $dateTo: String
    $environment: Environment
    $module: String
    $type: LogType
    $message: String
    $user: String
    $ip: String
    $offset: Int
    $size: Int
    $sort: String
  ) {
    traces(
      _id: $_id
      operation: $operation
      dateFrom: $dateFrom
      dateTo: $dateTo
      environment: $environment
      module: $module
      type: $type
      message: $message
      user: $user
      ip: $ip
      offset: $offset
      size: $size
      sort: $sort
    ) {
      _id
      operation
      ip
      user
      module
      date
      environment
      logs {
        _id
        message
        timestamp
        data
        type
      }
    }
  }
`

export const useTraces = ({ size = PAGE_SIZE, page = 0, ...rest }) => {
  const { data, ...query } = useQuery(TRACES, {
    fetchPolicy: 'no-cache',
    context: {
      clientName: 'sys'
    },
    variables: {
      size: size + 1,
      offset: page * size,
      ...rest
    }
  })
  const traces = (data && data.traces) || []
  const hasMore = traces.length == size + 1
  return {
    traces: hasMore ? traces.slice(0, -1) : traces,
    hasMore,
    ...query
  }
}

const TRACE_FACETS = gql`
  query traceFacets {
    traceFacets {
      operations {
        _id
        count
      }
      modules {
        _id
        count
      }
      dates {
        min
        max
      }
    }
  }
`

export const useTraceFacets = () => {
  const { data, ...query } = useQuery(TRACE_FACETS, {
    context: {
      clientName: 'sys'
    }
  })

  return { traceFacets: data && data.traceFacets, data, ...query }
}
