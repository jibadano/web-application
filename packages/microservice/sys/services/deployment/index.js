const { gql, ApolloError } = require('apollo-server')
const vercel = require('./vercel')
const render = require('./render')

module.exports = (ms) => {
  const typeDefs = gql`
    extend type Query {
      deployStatus: String @auth
      deployments: [Deployment] @auth(requires: USER)
    }
    extend type Mutation {
      deploy: String @auth(requires: USER)
    }

    type Deployment {
      _id: ID
      service: DeployService
      status: String
      moduleId: String
      commit: Commit
      createdAt: Date
      finishedAt: Date
    }

    type Commit {
      _id: ID
      message: String
    }

    enum DeployService {
      vercel
      render
    }
  `

  const apps = ms.config.get('..apps')
  const services = ms.config.get('..services')
  const deploySettings = []

  for (const appId in apps) {
    if (apps[appId].deploy) {
      const token = ms.config.get(apps[appId].deploy.service + '.token')
      deploySettings.push({ ...apps[appId].deploy, token, moduleId: appId })
    }
  }

  for (const serviceId in services) {
    if (serviceId != 'default') {
      if (services[serviceId].deploy) {
        const token = ms.config.get(
          services[serviceId].deploy.service + '.token'
        )
        deploySettings.push({
          ...services[serviceId].deploy,
          token,
          moduleId: serviceId
        })
      }
    }
  }

  const getDeployments = () => {
    const promises = deploySettings.map(
      ({ service, ...data }) =>
        new Promise((resolve) => {
          if (service == 'vercel') vercel.deployments(data).then(resolve)
          if (service == 'render') render.deployments(data).then(resolve)
        })
    )

    return Promise.all(promises).then((results) =>
      results
        .reduce((cur, acc) => acc.concat(cur), [])
        .sort(function (a, b) {
          return b.createdAt - a.createdAt
        })
    )
  }
  const resolvers = {
    Query: {
      deployStatus: async () => {
        const settings = await ms.model.Config.findOne({ _id: 'settings' })
          .select('status')
          .exec()

        if (settings.status == 'info') {
          const deployments = await getDeployments()

          const done = deployments.every(({ status }) => status != 'info')
          if (done) {
            await ms.model.Config.findOneAndUpdate(
              {
                _id: 'settings'
              },
              { status: 'ok' }
            ).exec()
            settings.status = 'ok'
          }
        }

        return settings.status
      },
      deployments: () => getDeployments()
    },
    Mutation: {
      deploy: async () => {
        const settings = await ms.model.Config.findOne({
          _id: 'settings'
        }).exec()

        if (settings.status != 'warning')
          return new ApolloError('Can not be deployed')

        deploySettings.forEach(({ service, ...data }) => {
          if (service == 'vercel') vercel.deploy(data)
          if (service == 'render') render.deploy(data)
        })

        await ms.model.Config.findOneAndUpdate(
          {
            _id: 'settings'
          },
          { status: 'info' }
        ).exec()

        return 'info'
      }
    }
  }

  return { typeDefs, resolvers }
}
