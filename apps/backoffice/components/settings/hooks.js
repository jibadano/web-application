import get from 'lodash/get'
import { useQuery, useMutation, gql } from '@apollo/client'
import { useTranslation } from 'lib/i18next'

const DEPLOYMENTS = gql`
  query deployments {
    deployments {
      _id
      service
      status
      moduleId
      commit {
        _id
        message
      }
      createdAt
      finishedAt
    }
  }
`

export const useDeployments = (_id) => {
  const { data, ...rest } = useQuery(DEPLOYMENTS, {
    notifyOnNetworkStatusChange: true,
    context: {
      clientName: 'sys'
    }
  })
  return { deployments: get(data, 'deployments') || [], data, ...rest }
}

const DEPLOY_STATUS = gql`
  query deployStatus {
    deployStatus
  }
`
export const useDeployStatus = () => {
  const { data, loading, ...rest } = useQuery(DEPLOY_STATUS, {
    context: {
      clientName: 'sys'
    }
  })
  return {
    deployStatus: loading ? 'loading' : data && data.deployStatus,
    ...rest
  }
}

const DEPLOY = gql`
  mutation deploy {
    deploy
  }
`

export const useDeploy = () =>
  useMutation(DEPLOY, {
    context: {
      clientName: 'sys'
    },
    update(cache, { data: { deploy } }) {
      try {
        if (deploy)
          cache.writeQuery({
            query: DEPLOY_STATUS,
            data: { deployStatus: 'info' }
          })
      } catch (e) {
        console.log(e)
      }
    }
  })

const SETTINGS = gql`
  query settings {
    settings
  }
`

export const useSettings = () => {
  const query = useQuery(SETTINGS, {
    context: {
      clientName: 'sys'
    }
  })
  return { ...query, settings: get(query, 'data.settings') || [] }
}

const UPDATE_SETTINGS = gql`
  mutation updateSettings($settings: Settings) {
    updateSettings(settings: $settings)
  }
`

export const useUpdateSettings = () =>
  useMutation(UPDATE_SETTINGS, {
    context: {
      clientName: 'sys'
    },
    notifyOnNetworkStatusChange: true,

    update(cache, { data: { updateSettings } }) {
      try {
        cache.writeQuery({
          query: DEPLOY_STATUS,
          data: { deployStatus: 'warning' }
        })
        cache.writeQuery({
          query: SETTINGS,
          data: { settings: updateSettings }
        })
      } catch (e) {}
    }
  })

const UPDATE_TRANSLATION = gql`
  mutation updateTranslation($key: ID!, $values: [TranslationValue]) {
    updateTranslation(key: $key, values: $values)
  }
`

export const useUpdateTranslation = () => {
  const { i18n } = useTranslation()
  return useMutation(UPDATE_TRANSLATION, {
    context: {
      clientName: 'sys'
    },
    notifyOnNetworkStatusChange: true,
    update(cache, { data: { updateTranslation }, ...query }) {
      updateTranslation.translations.forEach(({ key, values }) =>
        values.forEach(({ language, text }) => {
          i18n.addResourceBundle(
            language,
            'translation',
            { [key]: text },
            true,
            true
          )
        })
      )

      try {
        cache.writeQuery({
          query: DEPLOY_STATUS,
          data: { deployStatus: 'warning' }
        })

        const { settings } = cache.readQuery({ query: SETTINGS })

        cache.writeQuery({
          query: SETTINGS,
          data: {
            settings: {
              ...settings,
              translations: [...updateTranslation.translations]
            }
          }
        })
      } catch (e) {
        console.log(e)
      }
    }
  })
}
