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
          refreshSettings: String
        }

        scalar Date
        scalar LocalizedString
      `
    ]

    const version = ms.config.get('version')
    this.resolvers = [
      {
        Query: {
          version: () => version
        },
        Mutation: {
          refreshSettings: () => 'not implemented'
        }
      }
    ]

    this.routes = []
    this.schemaDirectives = {}

    this.reportData = []
    ;['default'].concat(servicesPaths).forEach((servicesPath) => {
      const defaultPath = __dirname + '/' + servicesPath + '/services'

      try {
        fs.readdirSync(defaultPath).forEach((serviceFile) => {
          this.processService(
            defaultPath + '/' + serviceFile,
            serviceFile.replace('.js', ''),
            servicesPath,
            ms
          )
        })
      } catch (e) {
        console.log(e)
        //ignore
      }
      const serviceDir = './' + servicesPath + '/services'
      try {
        fs.readdirSync(serviceDir).forEach((serviceFile) => {
          if (serviceFile !== 'index.js')
            this.processService(
              path.resolve(`${serviceDir}/${serviceFile}`),
              serviceFile.replace('.js', ''),
              servicesPath,
              ms
            )
        })
      } catch (e) {
        //ignore
      }
    })
  }

  reportServices = () => {
    const columnLengths = this.reportData.reduce(
      (acc, curr) => {
        acc[0] = Math.max(acc[0], curr[0].length)
        acc[1] = Math.max(acc[1], curr[1].length)
        acc[2] = Math.max(acc[2], curr[2].length)
        acc[3] = Math.max(acc[3], curr[3].length)

        return acc
      },
      [0, 0, 0, 0]
    )

    const adjustLength = (value, length) =>
      value + ' '.repeat(length - value.length)

    return this.reportData.reduce((acc, cur) => {
      acc +=
        adjustLength(cur[0], columnLengths[0]) +
        '\t' +
        adjustLength(cur[1], columnLengths[1]) +
        '\t' +
        adjustLength(cur[2], columnLengths[2]) +
        '\t' +
        adjustLength(cur[3], columnLengths[3]) +
        '\n'

      return acc
    }, '')
  }

  report = () => `✅ - ${this.reportData.length} entries`

  processService = (servicePath, serviceName, module, ms) => {
    const service = require(servicePath)(ms)

    if (service.directives) {
      Object.keys(service.directives).forEach((directiveName) =>
        this.reportData.push([
          module,
          serviceName,
          'GRAPHQL Directive',
          directiveName
        ])
      )

      this.schemaDirectives = {
        ...this.schemaDirectives,
        ...service.directives
      }
    }

    if (service.typeDefs && service.resolvers) {
      this.typeDefs.push(service.typeDefs)
      this.resolvers.push(service.resolvers)

      Object.keys(service.resolvers.Query || {}).forEach((queryName) =>
        this.reportData.push([module, serviceName, 'GRAPHQL Query', queryName])
      )
      Object.keys(service.resolvers.Mutation || {}).forEach((mutationName) =>
        this.reportData.push([
          module,
          serviceName,
          'GRAPHQL Mutation',
          mutationName
        ])
      )
    } else if (
      typeof service === 'function' &&
      serviceName != this.graphqlPath
    ) {
      this.routes.push({
        method: 'all',
        path: `/${serviceName}`,
        handler: service
      })
      this.reportData.push([module, serviceName, 'ALL', '/' + serviceName])
    }

    const methods = Object.keys(service)
    methods.forEach((method) => {
      if (['get', 'post', 'put', 'delete', 'all'].includes(method)) {
        this.routes.push({
          method,
          path: `/${serviceName}`,
          handler: service[method]
        })
        this.reportData.push([
          module,
          serviceName,
          method.toUpperCase(),
          '/' + serviceName
        ])
      }
    })
  }

  init = (app) => {
    const context = {}
    this.context.handlers.forEach((contextItem) => {
      context[contextItem.name] = contextItem.handler(req, res)
    })

    this.routes.forEach(({ method, path, handler }) => {
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
