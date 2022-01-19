import { useQuery, useMutation, gql } from '@apollo/client'
import get from 'lodash/get'

const DEPLOYMENTS = gql`
  query deployments {
    deployments {
      _id
      date
      status
      settings
    }
  }
`

export const useDeployments = (_id) => {
  const { data, ...rest } = useQuery(DEPLOYMENTS, {
    context: {
      clientName: 'system'
    }
  })
  return { deployments: get(data, 'deployments') || [], data, ...rest }
}

const START_DEPLOY = gql`
  mutation startDeploy($_id: ID) {
    startDeploy(_id: $_id) {
      _id
      date
      status
      settings
    }
  }
`

export const useStartDeploy = () =>
  useMutation(START_DEPLOY, {
    context: {
      clientName: 'system'
    },
    update(cache, { data: { startDeploy } }) {
      try {
        const { deployments } = cache.readQuery({ query: DEPLOYMENTS })

        cache.writeQuery({
          query: DEPLOYMENTS,
          data: { deployments: [startDeploy, ...deployments] }
        })
      } catch (e) {
        console.log(e)
      }
    }
  })

const DEPLOY_STATUS = gql`
  query deployStatus {
    deployStatus
  }
`
export const useDeployStatus = () => {
  const { data, loading, ...rest } = useQuery(DEPLOY_STATUS, {
    context: {
      clientName: 'system'
    }
  })
  return {
    deployStatus: loading ? 'loading' : data && data.deployStatus,
    ...rest
  }
}
