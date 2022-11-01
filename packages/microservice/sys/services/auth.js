const { gql, ApolloError } = require('apollo-server')
const ms = require('..')
const crypto = require('crypto')
const config = require('@jibadano/config')

const validate = ({ password, hash, salt }) =>
  hash ==
  crypto
    .createHash(config.get('login.algorithm'))
    .update(password + salt)
    .digest('hex')

const generate = ({ _id, password }) => {
  const salt = crypto.randomBytes(config.get('login.saltBytes')).toString()
  const hash = crypto
    .createHash(config.get('login.algorithm'))
    .update(password + salt)
    .digest('hex')
  return { _id, username: _id, hash, salt }
}

const typeDefs = gql`
  scalar Token

  extend type Query {
    token: Token
  }

  extend type Mutation {
    login(_id: ID, password: String, remember: Boolean): Token
    signup(_id: ID!, password: String!, role: Role): Credential
    updatePassword(_id: ID!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    token: (_, __, context) => {
      if (!context || !context.session || !context.session.user) return null

      delete context.session.exp
      delete context.session.iat
      return ms.sign(context.session)
    }
  },
  Mutation: {
    login: async (_, { _id, password, remember }) => {
      const user = await ms.model.Credential.findOne({ _id }).exec()

      if (!user) return new ApolloError('User not found')
      if (user.inactive) return new ApolloError('User is inactive')

      user.password = password
      if (!validate(user)) return new ApolloError('Password is invalid')

      return ms.sign(
        { user: { _id: user._id, role: user.role } },
        remember ? { expiresIn: '1y' } : null
      )
    },
    signup: (_, { _id, password, role = 'USER' }) => {
      const credential = generate({ _id, password })
      return new ms.model.Credential({ ...credential, role }).save()
    },
    updatePassword: (_, { _id, password }) => {
      const credential = password ? generate({ _id, password }) : { _id }

      return ms.model.Credential.findOneAndUpdate(
        { _id },
        { ...credential },
        { new: true }
      )
        .select('_id role createdAt')
        .exec()
    }
  }
}

const all = (req, res) => {
  if (!req.headers.authorization) return res.end()

  const token = req.headers.authorization.replace('Bearer ', '')

  const session = ms.verify(token)
  if (!session || !session.user) return res.end()

  delete session.exp
  delete session.iat
  res.end(ms.sign(session))
}

module.exports = { typeDefs, resolvers, all }
