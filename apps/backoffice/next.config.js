const path = require('path')
const withTM = require('next-transpile-modules')(['form', 'image'])

module.exports = withTM({
  webpack: (config) => {
    config.module.rules[2].oneOf[2].include.push(
      path.resolve(__dirname, '../web/components')
    )

    config.module.rules[2].oneOf[2].include.push(
      path.resolve(__dirname, '../web/pages')
    )

    return config
  },
  publicRuntimeConfig: {
    config: JSON.parse(process.env.config)
  }
})
