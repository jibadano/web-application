const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

const getSchemaName = (schemaFile) => {
  let schemaName = schemaFile.replace('.js', '')

  schemaName = schemaName.charAt(0).toUpperCase() + schemaName.slice(1)

  return schemaName
}
module.exports = class Model {
  async init(config) {
    const modelPaths = config.get('selectedServices')
    const modelConnection = await mongoose.createConnection(
      config.get('mongo'),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    const schemas = []
    try {
      ;['default'].concat(modelPaths).forEach((modelPath) => {
        const defaultModelDir = __dirname + '/' + modelPath + '/model'
        try {
          fs.readdirSync(defaultModelDir).forEach((schemaFile) => {
            const schema = require(defaultModelDir + '/' + schemaFile)
            let schemaName = getSchemaName(schemaFile)
            this[schemaName] = modelConnection.model(schemaName, schema)
            schemas.push(schemaName)
          })
        } catch (e) {
          //ignore
        }

        const modelDir = './' + modelPath + '/model'
        try {
          fs.readdirSync(modelDir).forEach((schemaFile) => {
            if (schemaFile !== 'index.js') {
              const schema = require(path.resolve(`${modelDir}/${schemaFile}`))
              let schemaName = getSchemaName(schemaFile)
              this[schemaName] = modelConnection.model(schemaName, schema)
              schemas.push(schemaName)
            }
          })
        } catch (e) {
          //ignore
        }
      })
    } catch (e) {
      console.error(e)
    }
    schemas.length &&
      console.info(`🌎Model READY ${schemas.map((s) => `\n\t${s}`)}`)
  }
}
