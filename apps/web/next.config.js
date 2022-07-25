!process.env.CONFIG_URL && require('dotenv').config({ path: '../../.env' })
const withTM = require('next-transpile-modules')(['form', 'image'])

const withPWA =
  process.env.NODE_ENV != 'development' ? require('next-pwa') : (v) => v
const { withConfig } = require('@jibadano/config/init')

module.exports = withConfig(withTM(withPWA({})))
