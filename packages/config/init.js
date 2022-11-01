const mongoose = require('mongoose')
const merge = require('lodash/merge')
const path = require('path')

const get = require('lodash/get')
const set = require('lodash/set')

const getRemoteConfig = async (configUrl) => {
  await mongoose.connect(configUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  if (!mongoose.models.Config)
    mongoose.model(
      'Config',
      new mongoose.Schema({ _id: String, any: mongoose.Schema.Types.Mixed })
    )

  let configList = await mongoose.models.Config.find().exec()
  const config = configList.find(({ _id }) => _id == 'main').toObject()
  const settings = configList.find(({ _id }) => _id == 'settings').toObject()
  const translations = configList
    .find(({ _id }) => _id == 'translations')
    .toObject()

  return { config, settings, translations }
}

const getLocalConfig = async () => {
  const config = require('../../config.json')
  const settings = require('../../settings.json')
  const translations = require('../../translations.json')

  return { config, settings, translations }
}

const load = async () =>
  process.env.CONFIG_URL
    ? getRemoteConfig(process.env.CONFIG_URL)
    : getLocalConfig()

const processSubmodule = (values = {}, name, def, mode) => {
  values.name = values.name || name
  let public = values.public || []
  if (def) {
    const modConfig = values

    values = merge(modConfig, def, (objValue, srcValue) =>
      typeof objValue == 'object'
        ? merge(objValue, srcValue, mergePolicy)
        : objValue
    )

    public = public.concat(values.public || [])
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

const mergeServices = (values = {}) => {
  let newValues = {}

  for (let service in values) {
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

  return values
}

const processConfig = ({ config, settings, translations }, mode) => {
  const apps = processModule(config.apps)
  const services = processModule(config.services, mode)

  let current
  if (mode == 'private') {
    const selectedServices =
      (process.argv[2] && process.argv[2].split(',')) ||
      Object.keys(services).filter((service) => service != 'default')

    current = mergeServices(services)
    current.name = selectedServices.toString()
    current.selectedServices = selectedServices
  } else {
    const pjson = require(path.resolve(`./package.json`))

    current = apps[pjson.name]
  }

  return {
    current,
    apps,
    services,
    settings,
    translations: translations.translations
  }
}

const initConfig = async (mode = 'private') => {
  mode = process.env.npm_package_name == 'services' ? 'private' : 'public'
  const configRaw = await load()
  const config = processConfig(configRaw, mode) || {}
  process.env.CONFIG = JSON.stringify(config)

  return config
}

const withConfig = async (nextConfig = { env: {} }) => {
  const conf = await initConfig('public')
  nextConfig.publicRuntimeConfig = nextConfig.publicRuntimeConfig || {}
  nextConfig.publicRuntimeConfig.config = conf
  nextConfig.env = nextConfig.env || {}
  nextConfig.env.CONFIG = JSON.stringify(conf)

  return nextConfig
}

module.exports = { withConfig, initConfig }
