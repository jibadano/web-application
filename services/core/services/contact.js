const { gql } = require('apollo-server')
const ms = require('@jibadano/microservice')
const config = require('@jibadano/config')
const typeDefs = gql`
  extend type Mutation {
    contact(name: String, contact: String, comment: String): Boolean
  }
`

const resolvers = {
  Mutation: {
    contact: (_, { name, contact, comment }) =>
      ms.mail.sendPlain(
        config.get('..settings.contact.email'),
        `Consulta - ${name}`,
        `Nombre: ${name}
         Contacto: ${contact}

         ${comment}
        `
      )
  }
}

module.exports = { typeDefs, resolvers }
