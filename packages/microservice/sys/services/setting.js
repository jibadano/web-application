const { gql } = require('apollo-server')
const get = require('lodash/get')

module.exports = (ms) => {
  const typeDefs = gql`
    extend type Query {
      settings: Settings @auth
      translations: [Translation] @auth
    }

    extend type Mutation {
      updateSettings(settings: Settings): Settings @auth(requires: USER)
      updateTranslation(key: ID!, values: [TranslationValue]): Translation
        @auth(requires: USER)
    }

    input InputTranslation {
      key: ID!
      values: [TranslationValue]
    }

    scalar Settings
    scalar Translation
    scalar TranslationValue
  `

  const resolvers = {
    Query: {
      settings: () => ms.model.Config.findOne({ _id: 'settings' }).exec()
    },
    Mutation: {
      updateTranslation: (_, { key, values }) =>
        ms.model.Config.findOneAndUpdate(
          { _id: 'settings', 'translations.key': key },
          {
            $set: {
              status: 'warning',
              'translations.$.values': values
            }
          },
          {
            new: true
          }
        ).exec(),
      updateSettings: (_, { settings }) => {
        delete settings._id

        return ms.model.Config.findOneAndUpdate(
          { _id: 'settings' },
          { ...settings, status: 'warning' },
          {
            upsert: true,
            new: true
          }
        ).exec()
      }
    }
  }

  return { typeDefs, resolvers }
}
