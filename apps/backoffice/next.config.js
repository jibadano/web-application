!process.env.CONFIG_URL && require('dotenv').config({ path: '../../.env' })

const path = require('path')
const withTM = require('next-transpile-modules')(['form', 'image'])
const { withConfig } = require('@jibadano/config/init')

module.exports = withConfig(
  withTM({
    webpack: (config) => {
      config.module.rules[2].oneOf[2].include.push(
        path.resolve(__dirname, '../web/components')
      )

      config.module.rules[2].oneOf[2].include.push(
        path.resolve(__dirname, '../web/pages')
      )

      return config
    }
  })
)
