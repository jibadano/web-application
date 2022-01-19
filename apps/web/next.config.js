require('dotenv').config()
const withTM = require('next-transpile-modules')(['fade-on-screen'])

const path = require('path')
const Dotenv = require('dotenv-webpack')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

const withPWA =
  process.env.NODE_ENV != 'development' ? require('next-pwa') : (v) => v

module.exports = withTM(
  withPWA({
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

      return config
    },
    pwa: {
      dest: 'public'
    },
    publicRuntimeConfig: {
      config: JSON.parse(process.env.config)
    }
  })
)
