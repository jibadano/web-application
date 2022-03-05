const withTM = require('next-transpile-modules')(['form', 'image'])
const withPWA =
  process.env.NODE_ENV != 'development' ? require('next-pwa') : (v) => v

module.exports = withTM(
  withPWA({
    pwa: {
      dest: 'public'
    },
    publicRuntimeConfig: {
      config: JSON.parse(process.env.config)
    }
  })
)
