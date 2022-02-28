import get from 'lodash/get'
import { useQuery, useMutation, gql } from '@apollo/client'
import { useTranslation } from 'common-lib/i18next'

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

const SETTINGS = gql`
  query settings {
    settings
  }
`

export const useSettings = () => {
  const query = useQuery(SETTINGS, {
    context: {
      clientName: 'system'
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
      clientName: 'system'
    },
    notifyOnNetworkStatusChange: true,

    update(cache, { data: { updateSettings } }) {
      try {
        cache.writeQuery({
          query: DEPLOY_STATUS,
          data: { deployStatus: updateSettings.status }
        })
        cache.writeQuery({
          query: SETTINGS,
          data: { settings: updateSettings }
        })
      } catch (e) {}
    }
  })

const TRANSLATIONS = gql`
  query translations {
    translations
  }
`

export const useTranslations = () => {
  const query = useQuery(TRANSLATIONS, {
    context: {
      clientName: 'system'
    }
  })
  return { ...query, translations: get(query, 'data.translations') || [] }
}

const UPDATE_TRANSLATION = gql`
  mutation updateTranslation(
    $key: ID!
    $newKey: String
    $values: [TranslationValue]
  ) {
    updateTranslation(key: $key, newKey: $newKey, values: $values)
  }
`

export const useUpdateTranslation = () => {
  const { i18n } = useTranslation()
  return useMutation(UPDATE_TRANSLATION, {
    context: {
      clientName: 'system'
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
          data: { deployStatus: 'required' }
        })
        cache.writeQuery({
          ...query,
          query: TRANSLATIONS,
          data: { translations: [...updateTranslation.translations] }
        })
      } catch (e) {
        console.log(e)
      }
    }
  })
}

const INSERT_TRANSLATION = gql`
  mutation insertTranslation($key: ID!, $values: [TranslationValue]) {
    insertTranslation(key: $key, values: $values)
  }
`

export const useInsertTranslation = () =>
  useMutation(INSERT_TRANSLATION, {
    context: {
      clientName: 'system'
    },
    notifyOnNetworkStatusChange: true,

    update(cache, { data: { insertTranslation }, ...query }) {
      try {
        cache.writeQuery({
          ...query,
          query: TRANSLATIONS,
          data: { translations: [...insertTranslation.translations] }
        })
      } catch (e) {
        console.log(e)
      }
    }
  })
