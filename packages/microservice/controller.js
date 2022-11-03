const fs = require('fs')
const { gql } = require('apollo-server')
const path = require('path')
const { ApolloServer } = require('apollo-server-express')
const Context = require('./context')

module.exports = class Controller {
  constructor(ms) {
    this.context = new Context(ms)
    this.graphqlPath = ms.config.get('graphql.path') || '/graphql'
    const servicesPaths = ms.config.get('selectedServices')
    this.typeDefs = [
      gql`
        type Query {
          version: String
        }

        type Mutation {
          refreshSettings: Boolean
        }

        scalar Date
        scalar LocalizedString
      `
    ]

    this.resolvers = [
      {
        Query: {
          version: () => config.get('version')
        },
        Mutation: {
          refreshSettings: () => config.refreshSettings()
        }
      }
    ]

    this.routes = []
    this.schemaDirectives = {}
    this.graphqlServices = []
    this.moduleMap = {}
    ;['default'].concat(servicesPaths).forEach((servicesPath) => {
      const defaultPath = __dirname + '/' + servicesPath + '/services'

      try {
        fs.readdirSync(defaultPath).forEach((serviceFile) => {
          this.processService(
            defaultPath + '/' + serviceFile,
            servicesPath + '/' + serviceFile.replace('.js', ''),
            servicesPath,
            ms
          )
        })
      } catch (e) {
        //ignore
      }
      const serviceDir = './' + servicesPath + '/services'
      try {
        fs.readdirSync(serviceDir).forEach((serviceFile) => {
          if (serviceFile !== 'index.js')
            this.processService(
              path.resolve(`${serviceDir}/${serviceFile}`),
              servicesPath + '/' + serviceFile.replace('.js', ''),
              servicesPath,
              ms
            )
        })
      } catch (e) {
        //ignore
      }
    })
  }

  processService = (servicePath, serviceName, module, ms) => {
    const service = require(servicePath)(ms)

    if (service.directives) {
      this.schemaDirectives = {
        ...this.schemaDirectives,
        ...service.directives
      }
    }

    if (service.typeDefs && service.resolvers) {
      this.typeDefs.push(service.typeDefs)
      this.resolvers.push(service.resolvers)
      this.graphqlServices.push(serviceName)

      const gqlServices = [
        ...Object.keys(service.resolvers.Query || {}),
        ...Object.keys(service.resolvers.Mutation || {})
      ]

      gqlServices.forEach((service) => {
        this.moduleMap[service] = module
      })
    } else if (typeof service === 'function' && serviceName != this.graphqlPath)
      this.routes.push({
        method: 'all',
        path: `${serviceName}`,
        handler: service
      })

    const methods = Object.keys(service)
    methods.forEach((method) => {
      if (['get', 'post', 'put', 'delete', 'all'].includes(method))
        this.routes.push({
          method,
          path: `${serviceName}`,
          handler: service[method]
        })
    })

    this.moduleMap[serviceName] = module
  }

  init = (app) => {
    const context = {}
    this.context.handlers.forEach((contextItem) => {
      context[contextItem.name] = contextItem.handler(req, res)
    })

    this.routes.forEach(({ method, path, handler }) => {
      app[method](path, (req, res, next) => {
        req.context = context
        next()
      })
      app[method](path, handler)
    })

    if (this.resolvers && this.resolvers.length > 1) {
      this.server = new ApolloServer(this)
      this.server.createGraphQLServerOptions = (req, res) => {
        return {
          schema: this.server.schema,
          context: {
            session: req.user,
            trace: req.trace,
            log: req.log,
            ...context
          },
          formatError: (res) => {
            req.log && req.log('Response', JSON.stringify(res), 'error')
            return res
          },
          formatResponse: (res) => {
            req.log && req.log('Response', JSON.stringify(res.data))
            return res
          }
        }
      }

      this.server.applyMiddleware({
        app,
        path: this.graphqlPath
      })
    }
  }
}
