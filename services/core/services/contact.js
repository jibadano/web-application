const { gql } = require('apollo-server')

module.exports = (ms) => {
  const typeDefs = gql`
    extend type Mutation {
      contact(name: String, contact: String, comment: String): Boolean
    }
  `

  const resolvers = {
    Mutation: {
      contact: (_, { name, contact, comment }) =>
        ms.mail.sendPlain(
          ms.config.get('..settings.contact.email'),
          `Consulta - ${name}`,
          `Nombre: ${name}
         Contacto: ${contact}

         ${comment}
        `
        )
    }
  }

  return { typeDefs, resolvers }
}
