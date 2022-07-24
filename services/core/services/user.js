const { gql, ApolloError } = require('apollo-server')
const ms = require('../..')
const typeDefs = gql`
  extend type Query {
    user(_id: ID!): User @auth
    me: User @auth
  }

  extend type Mutation {
    updateUser(_id: ID!, name: String, avatar: String, jobTitle: String): User
      @auth
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
    user: (_, user) => User.findOne(user).exec(),
    me: (_, __, { session }) =>
      ms.model.User.findOne({ _id: session.user._id }).exec()
  },
  Mutation: {
    updateUser: (_, user, { session }) =>
      session.user.role != 'ADMIN' && user._id != session.user._id
        ? new ApolloError('Not allowed')
        : ms.model.User.findOneAndUpdate({ _id: user._id }, user, {
            upsert: true,
            new: true
          }).exec()
  }
}

module.exports = { typeDefs, resolvers }
