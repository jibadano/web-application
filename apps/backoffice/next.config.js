require('dotenv').config()

const path = require('path')
const Dotenv = require('dotenv-webpack')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

module.exports = {
  webpack: (config) => {
    config.plugins = config.plugins || []

    config.plugins = [
      ...config.plugins,
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      }),
      new MomentLocalesPlugin({
        localesToKeep: ['en', 'es']
      })
    ]

    config.module.rules[2].oneOf[2].include.push(
      path.resolve(__dirname, '../web/components')
    )

    config.module.rules[2].oneOf[2].include.push(
      path.resolve(__dirname, '../web/pages')
    )

    return config
  },
  pwa: {
    dest: 'public'
  },
  publicRuntimeConfig: {
    config: JSON.parse(process.env.config)
  }
}
