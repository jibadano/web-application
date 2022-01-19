const mongoose = require('mongoose')
const get = require('lodash/get')
const set = require('lodash/set')

const getConfig = async () => {
  let configList = []
  if (process.env.CONFIG_URL) {
    await mongoose.connect(process.env.CONFIG_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    if (!mongoose.models.Config)
      mongoose.model(
        'Config',
        new mongoose.Schema({ _id: String, any: mongoose.Schema.Types.Mixed })
      )
    configList = await mongoose.models.Config.find().exec()
  } else {
    configList = require('./config.json')
    configList.forEach((cfg) => (cfg.toObject = () => cfg))
  }

  const config = configList.find(({ _id }) => _id == 'main').toObject()
  const settings = configList.find(({ _id }) => _id == 'settings').toObject()
  const translations = configList
    .find(({ _id }) => _id == 'translations')
    .toObject()

  for (let mod in config) {
    if (mod != 'default' && mod != '_id' && config[mod]) {
      if (!config[mod]['url']) {
        let url = config[mod]['host'] || 'http://localhost'
        url += config[mod]['port'] ? ':' + config[mod]['port'] : ''
        config[mod]['url'] = url
      }
    }
  }

  return { ...config, settings, translations: translations.translations }
}

const getWebConfig = (config, moduleName) => {
  const webConfig = {
    settings: config.settings,
    translations: config.translations
  }
  const publicFields = get(config, `${moduleName}.publicFields`)
  if (publicFields)
    for (let field of publicFields) set(webConfig, field, get(config, field))

  return webConfig
}

const initConfig = async (moduleName) => {
  const config = await getConfig()
  if (!config) process.exit(1)

  const webConfig = getWebConfig(config, moduleName)
  process.env.config = JSON.stringify(webConfig)
  return get(config, `${moduleName}.port`)
}

const { spawn } = require('child_process')
!process.env.CONFIG_URL && require('dotenv').config()
let args = []

if (process.argv[2] == 'build') args.push('build')
if (process.argv[2] == 'start') args.push('start')

args = args.concat(
  process.argv.slice(
    ['build', 'start'].indexOf(process.argv[2]) > -1 ? 3 : 2,
    process.argv.length
  )
)

module.exports = async (moduleName) => {
  const port = await initConfig(moduleName)
  if (port) args = args.concat(['-p', port])

  const ls = spawn('next', args)

  ls.stdout.on('data', (data) => {
    console.log(data.toString())
  })

  ls.stderr.on('data', (data) => {
    console.error(data.toString())
  })

  ls.on('error', (error) => {
    console.error(`error: ${error.message}`)
  })

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
    process.exit(0)
  })
}
