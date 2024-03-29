import { useQuery, useMutation, gql } from '@apollo/client'
import { useRouter } from 'lib/router'
import get from 'lodash/get'
import Cookies from 'js-cookie'

const CREDENTIALS = gql`
  query credentials {
    credentials {
      _id
      role
      createdAt
    }
  }
`

export const useCredentials = () => {
  const { data, ...rest } = useQuery(CREDENTIALS, {
    context: {
      clientName: 'sys'
    }
  })
  return { credentials: get(data, 'credentials') || [], data, ...rest }
}

const CREDENTIAL = gql`
  query credential($_id: ID!) {
    credential(_id: $_id) {
      _id
      role
      createdAt
    }
  }
`

export const useCredential = (_id) => {
  const { data, ...rest } = useQuery(CREDENTIAL, {
    context: {
      clientName: 'sys'
    },
    variables: {
      _id
    }
  })
  return { credential: get(data, 'credential'), data, ...rest }
}

export const useToken = (skip) =>
  useQuery(TOKEN, {
    skip,
    context: {
      clientName: 'sys'
    }
  })

const SIGNUP = gql`
  mutation signup($_id: ID!, $password: String!, $role: Role) {
    signup(_id: $_id, password: $password, role: $role) {
      _id
      role
      createdAt
    }
  }
`

const LOGIN = gql`
  mutation login($_id: ID!, $password: String!, $remember: Boolean) {
    login(_id: $_id, password: $password, remember: $remember)
  }
`

export const useLogin = () => {
  const { refetch } = useToken(true)

  const [login, { data, loading, error }] = useMutation(LOGIN, {
    skip: true,
    context: {
      clientName: 'sys'
    }
  })

  const loginF = (props) =>
    login(props)
      .then(({ data }) => {
        Cookies.set('token', get(data, 'login'))
      })
      .then(() => refetch())

  return [loginF, { data, loading, error }]
}

export const useLogout = () => {
  const router = useRouter()
  return () => {
    Cookies.remove('token')
    return router.reload()
  }
}

const EXISTS = gql`
  query exists($_id: ID) {
    exists(_id: $_id)
  }
`

export const useExists = () =>
  useQuery(EXISTS, {
    skip: true,
    context: {
      clientName: 'sys'
    }
  })

const TOKEN = gql`
  query token {
    token
  }
`

export const useSignup = () => {
  const signup = useMutation(SIGNUP, {
    context: {
      clientName: 'sys'
    },
    update(cache, { data: { signup } }) {
      try {
        const { credentials } = cache.readQuery({ query: CREDENTIALS })

        cache.writeQuery({
          query: CREDENTIALS,
          data: { credentials: [...credentials, signup] }
        })
      } catch (e) {
        console.log(e)
      }
    }
  })

  return signup
}

const REMOVE_CREDENTIAL = gql`
  mutation removeCredential($_id: ID!) {
    removeCredential(_id: $_id) {
      _id
      role
      createdAt
    }
  }
`

export const useRemoveCredential = () =>
  useMutation(REMOVE_CREDENTIAL, {
    context: {
      clientName: 'sys'
    },
    update(cache, { data: { removeCredential } }) {
      try {
        const { credentials } = cache.readQuery({ query: CREDENTIALS })
        let newCredentials = [...credentials]
        let index = newCredentials.findIndex(
          (c) => c._id == removeCredential._id
        )
        if (index > -1) newCredentials.splice(index, 1)
        cache.writeQuery({
          query: CREDENTIALS,
          data: { credentials: newCredentials }
        })
      } catch (e) {
        console.log(e)
      }
    }
  })

const UPDATE_CREDENTIAL = gql`
  mutation updateCredential($_id: ID!, $role: Role) {
    updateCredential(_id: $_id, role: $role) {
      _id
      role
      createdAt
    }
  }
`

export const useUpdateCredential = () =>
  useMutation(UPDATE_CREDENTIAL, {
    context: {
      clientName: 'sys'
    },
    update(cache, { data: { updateCredential } }) {
      try {
        cache.writeQuery({
          query: CREDENTIAL,
          variables: { _id: updateCredential._id },
          data: { credential: updateCredential }
        })

        const { credentials } = cache.readQuery({ query: CREDENTIALS })
        let newCredentials = [...credentials]
        let index = newCredentials.findIndex(
          (c) => c._id == updateCredential._id
        )
        if (index > -1) newCredentials[index] = updateCredential

        cache.writeQuery({
          query: CREDENTIALS,
          data: { credentials: newCredentials }
        })
      } catch (e) {
        console.log(e)
      }
    }
  })

const ROLE = gql`
  query role {
    role
  }
`
export const useRole = () => {
  const { data } = useQuery(ROLE, {
    context: {
      clientName: 'sys'
    }
  })

  return data && data.role
}

const UPDATE_PASSWORD = gql`
  mutation updatePassword($_id: ID!, $password: String!) {
    updatePassword(_id: $_id, password: $password)
  }
`

export const useUpdatePassword = () =>
  useMutation(UPDATE_PASSWORD, {
    context: {
      clientName: 'sys'
    }
  })
