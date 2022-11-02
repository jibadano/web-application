const fs = require('fs')
const { gql } = require('apollo-server')
const path = require('path')

module.exports = class Controller {
  constructor(config) {
    const servicesPaths = config.get('selectedServices')
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
      console.log(defaultPath)

      try {
        fs.readdirSync(defaultPath).forEach((serviceFile) => {
          this.processService(
            defaultPath + '/' + serviceFile,
            servicesPath + '/' + serviceFile.replace('.js', ''),
            servicesPath
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
              servicesPath + '/' + serviceFile.replace('.js', ''),
              servicesPath
            )
        })
      } catch (e) {
        //ignore
      }
    })

    console.info(
      `🕹 Controller READY  ${this.routes.map(
        (r) => `\n\t${r.method}\t${r.path}`
      )} ${this.graphqlServices.map((s) => `\n\tgraphql\t${s}`)} ${Object.keys(
        this.schemaDirectives
      ).map((s) => `\n\tdirective\t${s}`)}`
    )
  }

  processService(servicePath, serviceName, module) {
    const service = require(servicePath)

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
    } else if (typeof service === 'function')
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
}
