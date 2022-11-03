const { gql, ApolloError } = require('apollo-server')
const crypto = require('crypto')

module.exports = (ms) => {
  const validate = ({ password, hash, salt }) =>
    hash ==
    crypto
      .createHash(ms.config.get('login.algorithm'))
      .update(password + salt)
      .digest('hex')

  const generate = ({ _id, password }) => {
    const salt = crypto.randomBytes(ms.config.get('login.saltBytes')).toString()
    const hash = crypto
      .createHash(ms.config.get('login.algorithm'))
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
        return ms.session.sign(context.session)
      }
    },
    Mutation: {
      login: async (_, { _id, password, remember }) => {
        const user = await ms.model.Credential.findOne({ _id }).exec()

        if (!user) return new ApolloError('User not found')
        if (user.inactive) return new ApolloError('User is inactive')

        user.password = password
        if (!validate(user)) return new ApolloError('Password is invalid')

        return ms.session.sign(
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

  return { typeDefs, resolvers }
}
