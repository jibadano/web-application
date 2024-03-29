const { gql, ApolloError } = require('apollo-server')

module.exports = (ms) => {
  const typeDefs = gql`
    extend type Query {
      user(_id: ID): User @auth
      me: User @auth
    }

    extend type Mutation {
      updateUser(
        _id: ID!
        name: String
        avatar: String
        jobTitle: String
      ): User @auth
      removeUser(_id: ID!): Boolean @auth
    }

    type User {
      _id: ID
      name: String
      avatar: String
      jobTitle: String
    }
  `

  const resolvers = {
    Query: {
      user: (_, user, { session }) =>
        ms.model.User.findOne({
          _id: (user && user._id) || session.user._id
        }).exec(),
      me: async (_, __, { session }) =>
        (await ms.model.User.findOne({ _id: session.user._id }).exec()) || {
          _id
        }
    },
    Mutation: {
      updateUser: (_, user, { session }) =>
        session.user.role != 'ADMIN' && user._id != session.user._id
          ? new ApolloError('Not allowed')
          : ms.model.User.findOneAndUpdate({ _id: user._id }, user, {
              upsert: true,
              new: true
            }).exec(),
      removeUser: async (_, user, { session }) => {
        if (session.user.role != 'ADMIN' && user._id != session.user._id)
          return new ApolloError('Not allowed')
        await ms.model.User.findOneAndRemove({ _id: user._id }).exec()
        await ms.model.Credential.findOneAndRemove({ _id: user._id }).exec()
        return true
      }
    }
  }

  return { typeDefs, resolvers }
}
