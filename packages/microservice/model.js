const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

const getSchemaName = (schemaFile) => {
  let schemaName = schemaFile.replace('.js', '')

  schemaName = schemaName.charAt(0).toUpperCase() + schemaName.slice(1)

  return schemaName
}
module.exports = class Model {
  constructor({ config }) {
    const modelPaths = config.get('selectedServices')
    this.mongo = config.get('mongo')
    this.schemas = {}
    ;['default'].concat(modelPaths).forEach((modelPath) => {
      const defaultModelDir = __dirname + '/' + modelPath + '/model'
      try {
        fs.readdirSync(defaultModelDir).forEach((schemaFile) => {
          const schema = require(defaultModelDir + '/' + schemaFile)({ config })
          let schemaName = getSchemaName(schemaFile)
          this.schemas[schemaName] = schema
        })
      } catch (e) {
        //ignore
      }

      const modelDir = './' + modelPath + '/model'
      try {
        fs.readdirSync(modelDir).forEach((schemaFile) => {
          if (schemaFile !== 'index.js') {
            const schema = require(path.resolve(`${modelDir}/${schemaFile}`))({
              config
            })
            let schemaName = getSchemaName(schemaFile)
            this.schemas[schemaName] = schema
          }
        })
      } catch (e) {
        //ignore
      }
    })
  }

  report = () =>
    this.mongo
      ? `✅ - ${Object.keys(this.schemas).join(', ')}`
      : '❗️ - mongo database is missing'

  init = async () => {
    const modelConnection = await mongoose.createConnection(this.mongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    for (let schemaName in this.schemas) {
      this[schemaName] = modelConnection.model(
        schemaName,
        this.schemas[schemaName]
      )
    }
  }
}
