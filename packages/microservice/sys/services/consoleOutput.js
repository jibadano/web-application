const { gql } = require('apollo-server')

module.exports = (ms) => {
  const typeDefs = gql`
    extend type Query {
      consoleOutputs(
        _id: ID
        date: Date
        value: String
        type: ConsoleOutputType
      ): [ConsoleOutput] @auth(requires: ADMIN)
    }

    type ConsoleOutput {
      _id: ID
      date: Date
      value: String
      type: ConsoleOutputType
    }

    enum ConsoleOutputType {
      log
      info
      error
      warning
    }
  `

  const resolvers = {
    Query: {
      consoleOutputs: async () => ms.monitor.ConsoleOutput.find()
    }
  }

  return { typeDefs, resolvers }
}
