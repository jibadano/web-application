import { useQuery, useMutation, gql } from '@apollo/client'
import get from 'lodash/get'

const USER = gql`
  query user($_id: ID!) {
    user(_id: $_id) {
      _id
      name
      avatar
      jobTitle
    }
  }
`

export const useUser = (_id) => {
  const { data, ...rest } = useQuery(USER, {
    ssr: true,
    variables: {
      _id
    }
  })
  return { user: get(data, 'user'), data, ...rest }
}

const ME = gql`
  query me {
    me {
      _id
      name
      avatar
      jobTitle
    }
  }
`

export const useMe = () => {
  const { data, ...rest } = useQuery(ME, { ssr: false })
  return { me: get(data, 'me'), data, ...rest }
}

const UPDATE_USER = gql`
  mutation updateUser(
    $_id: ID!
    $name: String
    $avatar: String
    $jobTitle: String
  ) {
    updateUser(_id: $_id, name: $name, avatar: $avatar, jobTitle: $jobTitle) {
      _id
      name
      avatar
      jobTitle
    }
  }
`

export const useUpdateUser = () =>
  useMutation(UPDATE_USER, {
    update(cache, { data: { updateUser } }) {
      try {
        cache.writeQuery({
          query: USER,
          variables: { _id: updateUser._id },
          data: { user: { ...updateUser } }
        })
      } catch (e) {}
    }
  })
