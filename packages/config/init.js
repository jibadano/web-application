const mongoose = require('mongoose')
const merge = require('lodash/merge')
const get = require('lodash/get')
const set = require('lodash/set')

const Config = require('./Config')

const getConfigItem = (configList, item) => {
  const itemConfig = configList.find(({ _id }) => _id == item)
  return itemConfig ? itemConfig.toObject() : null
}

const getRemoteConfig = async (configUrl) => {
  if (!configUrl)
    throw new Error('You must provide a database url to fetch the config data')

  try {
    await mongoose.connect(configUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  } catch (e) {
    throw new Error("Couldn't connect to the config database " + e.message)
  }

  if (!mongoose.models.Config)
    mongoose.model(
      'Config',
      new mongoose.Schema({ _id: String, any: mongoose.Schema.Types.Mixed })
    )

  let configList = await mongoose.models.Config.find().exec()

  if (!configList || !configList.length)
    throw new Error(
      'No config found on database, did you load the config? Remember to use the Config table.'
    )

  const config = getConfigItem(configList, 'main')
  const settings = getConfigItem(configList, 'settings')

  if (!config) throw new Error('The "main" config is missing')

  return { config, settings }
}

const processSubmodule = (values = {}, name, def, mode) => {
  values.name = values.name || name
  let public = values.public ? [...values.public] : []
  if (def) {
    const modConfig = values

    public = public.concat(def.public || [])

    values = merge(modConfig, def, (objValue, srcValue) =>
      typeof objValue == 'object'
        ? merge(objValue, srcValue, mergePolicy)
        : objValue
    )
  }

  if (!values['url']) {
    let url = values['host'] || 'http://localhost'
    url += values['port'] ? ':' + values['port'] : ''
    values['url'] = url
  }

  values['host'] = values['host'] || '0.0.0.0'
  values['port'] = process.env.PORT || values['port'] || 80

  if (public.length && mode == 'public') {
    const newValues = {}
    for (let field of public) {
      set(newValues, field, get(values, field))
    }

    values = newValues
  }

  return values
}

const mergeServices = (values = {}, selected) => {
  let newValues = {}

  for (let service in values) {
    if (selected.indexOf(service) > -1)
      newValues = merge(newValues, values[service], (objValue, srcValue) =>
        typeof objValue == 'object'
          ? merge(objValue, srcValue, mergePolicy)
          : objValue
      )
  }

  return newValues
}

const processModule = (values = {}, mode) => {
  let def = values.default

  const newValues = {}
  for (let submodule in values)
    if (submodule != 'default')
      newValues[submodule] = processSubmodule(
        values[submodule],
        submodule,
        def,
        mode
      )

  return newValues
}

const processConfig = ({ config, settings }, { appId, serviceId }) => {
  if (appId && serviceId)
    throw new Error(
      "Can't process configuration for apps and services simultaneously"
    )

  let current
  let services
  let apps

  if (appId) {
    apps = processModule(config.apps)

    if (!apps[appId]) throw new Error('appId not found in apps')
    services = processModule(config.services, 'public')

    current = apps[appId]
  } else {
    apps = processModule(config.apps)
    services = processModule(config.services, 'private')

    const selectedServices =
      (serviceId && serviceId.split(',')) ||
      Object.keys(services).filter((service) => service != 'default')

    if (!selectedServices.length) throw new Error('No services found')
    selectedServices.forEach((serviceId) => {
      if (!services[serviceId])
        throw new Error('serviceId not found in services')
    })

    current = mergeServices(services, selectedServices)
    current.name = selectedServices.toString()
    current.selectedServices = selectedServices
  }

  return {
    current,
    apps,
    services,
    settings
  }
}

const initConfig = async ({ dbUrl, serviceId, appId }) => {
  const configRaw = await getRemoteConfig(dbUrl)
  const config = processConfig(configRaw, { serviceId, appId }) || {}
  return new Config(config)
}

const withConfig =
  ({ dbUrl, appId }) =>
  async (nextConfig = { env: {} }) => {
    const configRaw = await getRemoteConfig(dbUrl)
    const config = processConfig(configRaw, { appId }) || {}

    nextConfig.env = nextConfig.env || {}
    nextConfig.env.CONFIG = JSON.stringify(config)

    return nextConfig
  }

module.exports = { withConfig, initConfig }
