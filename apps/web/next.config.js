require('dotenv').config()
const withTM = require('next-transpile-modules')([
  'fade-on-screen',
  'lib',
  'config'
])

const path = require('path')
const Dotenv = require('dotenv-webpack')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

const withPWA =
  process.env.NODE_ENV != 'development' ? require('next-pwa') : (v) => v
process.env.config =
  process.env.config ||
  JSON.stringify({
    settings: {
      _id: 'settings',
      contact: {
        email: 'contact@cloudxsoftware.com',
        instagram: 'psi_julianmorales',
        facebook: 'psijulian.morales.3',
        phone: '+359893271036',
        address: 'Sofia, Bulgaria'
      },
      app: {
        name: 'Colima',
        notificationEmail: 'contact@julianmorales.com.ar',
        pageSize: 12
      },
      theme: {
        palette: [Object],
        typography: [Object],
        components: [Object],
        shape: [Object]
      },
      i18next: { fallbackLng: 'es', whitelist: [Array], keySeparator: true },
      status: 'ok'
    },
    translations: [
      { key: 'brand.copyright.slogan', values: [Array] },
      { key: 'brand.slogan', values: [Array] },
      { key: 'menu.about', values: [Array] },
      { key: 'menu.therapies', values: [Array] },
      { key: 'menu.contact', values: [Array] },
      { key: 'menu.articles', values: [Array] },
      { key: 'setAnAppointment', values: [Array] },
      { key: 'setAnAppointment.desc', values: [Array] },
      { key: 'about.bio.1', values: [Array] },
      { key: 'about.bio.2', values: [Array] },
      { key: 'about.bio.3', values: [Array] },
      { key: 'about.quote', values: [Array] },
      { key: 'about.quote.source', values: [Array] },
      { key: 'home.title', values: [Array] },
      { key: 'home.subtitle', values: [Array] },
      { key: 'therapies.title', values: [Array] },
      { key: 'therapies.anxiety', values: [Array] },
      { key: 'therapies.anxiety.desc', values: [Array] },
      { key: 'therapies.depression', values: [Array] },
      { key: 'therapies.depression.desc', values: [Array] },
      { key: 'therapies.toc', values: [Array] },
      { key: 'therapies.toc.desc', values: [Array] },
      { key: 'therapies.phobias', values: [Array] },
      { key: 'therapies.phobias.desc', values: [Array] },
      { key: 'therapies.vitalCrises', values: [Array] },
      { key: 'therapies.vitalCrises.desc', values: [Array] },
      { key: 'therapies.personalDevelopment', values: [Array] },
      { key: 'therapies.personalDevelopment.desc', values: [Array] },
      { key: 'therapies.stress', values: [Array] },
      { key: 'therapies.stress.desc', values: [Array] },
      { key: 'therapies.message', values: [Array] },
      { key: 'viewMore', values: [Array] },
      { key: 'home.quote', values: [Array] },
      { key: 'home.quote.message', values: [Array] },
      { key: 'learnMore', values: [Array] },
      { key: 'contact.title', values: [Array] },
      { key: 'contact.subtitle', values: [Array] },
      { key: 'contact.send', values: [Array] },
      { key: 'contact.name', values: [Array] },
      { key: 'contact.message', values: [Array] },
      { key: 'contact.comment', values: [Array] },
      { key: 'contact.method', values: [Array] }
    ],
    default: { mail: { user: 'contact@cloudxsoftware.com' } },
    web: { services: ['system', 'core'], url: 'http://localhost:3001' },
    core: {
      cloudinary: { cloud_name: 'julianmorales' },
      url: 'http://localhost:9001'
    },
    system: { url: 'http://localhost:9000' }
  })

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
