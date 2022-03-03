const path = require('path')

module.exports = {
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
}
