import { useMemo } from 'react'
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'

import { concatPagination } from '@apollo/client/utilities'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'

import config from '@jibadano/config'
import Cookies from 'js-cookie'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

function getHttpLink() {
  const services = config.get('..services')
  const endpoints = []
  if (services) {
    for (let service in services) {
      if (service != 'default') {
        const uri = services[service].url + '/graphql'
        if (uri) endpoints.push({ name: service, uri })
      }
    }
    return split(endpoints, null)
  }
}

function split(endpoints, lastLink) {
  if (!endpoints.length) return lastLink

  if (!lastLink) {
    const link = endpoints.pop()
    lastLink = new HttpLink({
      uri: link.uri, // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      cache: new InMemoryCache({
        addTypename: false
      }).restore({})
    })
  }

  if (!endpoints.length) return lastLink

  const next = endpoints.pop()

  return split(
    endpoints,
    ApolloLink.split(
      (operation) => operation.getContext().clientName === next.name,
      new HttpLink({
        uri: next.uri, // Server URL (must be absolute)
        credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`,
        cache: new InMemoryCache({
          addTypename: false
        }).restore({})
      }),
      lastLink
    )
  )
}

let apolloClient
let httpLink = getHttpLink()

let authLink = setContext(({ variables }, { headers }) => {
  headers = { headers }
  const isBrowser = typeof window !== 'undefined'
  if (!isBrowser) return headers

  const token = Cookies.get('token')

  if (token) {
    return {
      headers: {
        ...headers.headers,
        authorization: `Bearer ${token}`
      }
    }
  }

  return headers
  // return the headers to the context so httpLink can read them
})

const resetToken = onError((err) => {
  if (get(err, 'response.errors.0.extensions.code') == 'UNAUTHENTICATED') {
    if (typeof window !== 'undefined') Cookies.remove('token')
  }
})

function createApolloClient() {
  let link = authLink.concat(resetToken)
  if (httpLink) link = link.concat(httpLink)

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link,
    cache: new InMemoryCache({
      addTypename: false,
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination()
          }
        }
      }
    })
  })
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        )
      ]
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}
