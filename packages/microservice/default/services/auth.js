const { gql, AuthenticationError } = require('apollo-server')
const { SchemaDirectiveVisitor } = require('apollo-server-express')
const { defaultFieldResolver } = require('graphql')

const ROLES = {
  GUEST: 0,
  USER: 1,
  ADMIN: 2
}

const isAuthorized = (role, requiredRole) => ROLES[requiredRole] <= ROLES[role]

class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    this.ensureFieldsWrapped(type)
    type._requiredAuthRole = this.args.requires
  }
  // Visitor methods for nested types like fields and arguments
  // also receive a details object that provides information about
  // the parent and grandparent types.
  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType)
    field._requiredAuthRole = this.args.requires
  }

  ensureFieldsWrapped(objectType) {
    // Mark the GraphQLObjectType object to avoid re-wrapping:
    if (objectType._authFieldsWrapped) return
    objectType._authFieldsWrapped = true

    const fields = objectType.getFields()

    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName]
      const { resolve = defaultFieldResolver } = field
      field.resolve = async function (...args) {
        // Get the required Role from the field first, falling back
        // to the objectType if no Role is required by the field:
        const requiredRole =
          field._requiredAuthRole || objectType._requiredAuthRole

        if (!requiredRole) {
          return resolve.apply(this, args)
        }

        const context = args[2]
        if (
          !context.session ||
          !context.session.user ||
          !isAuthorized(context.session.user.role, requiredRole)
        )
          throw new AuthenticationError('Session required')

        return resolve.apply(this, args)
      }
    })
  }
}

const directives = {
  auth: AuthDirective
}

const typeDefs = gql`
  enum Role {
    GUEST
    USER
    ADMIN
  }

  directive @auth(requires: Role = USER) on OBJECT | FIELD_DEFINITION
`

module.exports = { directives, typeDefs, resolvers: {} }
