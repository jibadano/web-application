!process.env.CONFIG_URL && require('dotenv').config({ path: '../../.env' })

const path = require('path')
const withTM = require('next-transpile-modules')(['form', 'image'])
const { withConfig } = require('@jibadano/config/init')

module.exports = withConfig(
  withTM({
    webpack: (config) => {
      config.module.rules.forEach((rule) => {
        if (rule.oneOf) {
          console.log(rule)
          rule.oneOf.forEach((one) => {
            if (
              one.test &&
              one.test.toString() == /\.(tsx|ts|js|cjs|mjs|jsx)$/.toString()
            ) {
              one.include.push(path.resolve(__dirname, '../web/components'))
              one.include.push(path.resolve(__dirname, '../web/pages'))
            }
          })
        }
      })

      return config
    }
  })
)
