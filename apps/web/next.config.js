require('dotenv').config()
const withTM = require('next-transpile-modules')(['fade-on-screen', 'config'])

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
        palette: {
          primary: { main: '#fff' },
          secondary: { main: '#38383b' },
          text: { primary: '#333', secondary: '#fff' },
          background: { default: '#fff', paper: '#fff' }
        },
        typography: {
          fontFamily: "'Poppins', sans-serif",
          body1: { fontWeight: 200 },
          h2: {
            lineHeight: 1.532,
            '@media (max-width:600px)': { fontSize: '2.6rem' }
          },
          h4: {
            lineHeight: 1.532,
            '@media (max-width:600px)': { fontSize: '1.5rem' }
          },
          h5: { lineHeight: 1.532, letterSpacing: 1.2, fontWeight: 300 },
          subtitle1: { fontSize: 25, letterSpacing: 2 },
          subtitle2: { fontSize: 16 },
          button: { textTransform: 'none' }
        },
        components: {
          MuiTypography: { defaultProps: { color: 'primary' } },
          MuiTextField: {
            defaultProps: { variant: 'outlined' },
            styleOverrides: { root: { backgroundColor: '#fff', color: '#333' } }
          },
          MuiInputLabel: {
            styleOverrides: {
              root: { color: '#333', 'Mui-focused': { color: '#333' } }
            }
          },
          MuiInputBase: {
            styleOverrides: {
              colorSecondary: { backgroundColor: '#fff', color: '#333' }
            }
          },
          MuiTab: {
            styleOverrides: { root: { fontSize: 15, fontWeight: 200 } }
          },
          PrivateTabIndicator: { styleOverrides: { root: { height: 1 } } },
          MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
              textSizeLarge: {
                fontSize: 24,
                fontWeight: 200,
                color: '#bbb',
                textDecoration: 'underline'
              },
              root: { padding: '12px 32px' },
              outlinedSizeLarge: { height: 56 },
              containedSizeLarge: { padding: '16px 42px' }
            }
          }
        },
        shape: { borderRadius: 0 }
      },
      i18next: { fallbackLng: 'es', whitelist: ['es'], keySeparator: true },
      status: 'ok'
    },
    translations: [
      {
        key: 'brand.copyright.slogan',
        values: [{ language: 'es', text: 'Made by CloudXSoftware' }]
      },
      {
        key: 'brand.slogan',
        values: [{ language: 'es', text: 'Basic website demo' }]
      },
      { key: 'menu.about', values: [{ language: 'es', text: 'Nosotros' }] },
      { key: 'menu.therapies', values: [{ language: 'es', text: 'Terapias' }] },
      { key: 'menu.contact', values: [{ language: 'es', text: 'Contacto' }] },
      { key: 'menu.articles', values: [{ language: 'es', text: 'Artículos' }] },
      {
        key: 'setAnAppointment',
        values: [{ language: 'es', text: 'Pedir un turno' }]
      },
      {
        key: 'setAnAppointment.desc',
        values: [
          { language: 'es', text: 'Ofrecemos atención online personalizada' }
        ]
      },
      {
        key: 'about.bio.1',
        values: [{ language: 'es', text: 'Licenciado Julián Morales' }]
      },
      { key: 'about.bio.2', values: [{ language: 'es', text: 'Bio' }] },
      { key: 'about.bio.3', values: [{ language: 'es', text: 'Bio2' }] },
      {
        key: 'about.quote',
        values: [
          {
            language: 'es',
            text: '"La felicidad no es un objetivo, es una consecuencia."'
          }
        ]
      },
      {
        key: 'about.quote.source',
        values: [{ language: 'es', text: '— Eleanor Roosevelt' }]
      },
      {
        key: 'home.title',
        values: [
          {
            language: 'es',
            text: 'Construir la vida que sueñas require tiempo, paciencia y compromiso.'
          }
        ]
      },
      {
        key: 'home.subtitle',
        values: [{ language: 'es', text: 'Anímate a dar el primer paso' }]
      },
      {
        key: 'therapies.title',
        values: [{ language: 'es', text: 'Terapia individual' }]
      },
      {
        key: 'therapies.anxiety',
        values: [{ language: 'es', text: 'Ansiedad' }]
      },
      {
        key: 'therapies.anxiety.desc',
        values: [
          {
            language: 'es',
            text: 'Descripción, tratamiento, modalidad, etc....'
          }
        ]
      },
      {
        key: 'therapies.depression',
        values: [{ language: 'es', text: 'Depresión' }]
      },
      {
        key: 'therapies.depression.desc',
        values: [
          {
            language: 'es',
            text: 'Descripción, tratamiento, modalidad, etc....'
          }
        ]
      },
      { key: 'therapies.toc', values: [{ language: 'es', text: 'TOC' }] },
      {
        key: 'therapies.toc.desc',
        values: [
          {
            language: 'es',
            text: 'Descripción, tratamiento, modalidad, etc....'
          }
        ]
      },
      {
        key: 'therapies.phobias',
        values: [{ language: 'es', text: 'Fobias' }]
      },
      {
        key: 'therapies.phobias.desc',
        values: [
          {
            language: 'es',
            text: 'Descripción, tratamiento, modalidad, etc....'
          }
        ]
      },
      {
        key: 'therapies.vitalCrises',
        values: [{ language: 'es', text: 'Crisis vitales' }]
      },
      {
        key: 'therapies.vitalCrises.desc',
        values: [
          {
            language: 'es',
            text: 'Descripción, tratamiento, modalidad, etc....'
          }
        ]
      },
      {
        key: 'therapies.personalDevelopment',
        values: [{ language: 'es', text: 'Desarrollo personal' }]
      },
      {
        key: 'therapies.personalDevelopment.desc',
        values: [
          {
            language: 'es',
            text: 'Descripción, tratamiento, modalidad, etc....'
          }
        ]
      },
      { key: 'therapies.stress', values: [{ language: 'es', text: 'Estrés' }] },
      {
        key: 'therapies.stress.desc',
        values: [
          {
            language: 'es',
            text: 'Descripción, tratamiento, modalidad, etc....'
          }
        ]
      },
      {
        key: 'therapies.message',
        values: [
          {
            language: 'es',
            text: 'Conoce todos los trastornos que tratamos y terapias.'
          }
        ]
      },
      { key: 'viewMore', values: [{ language: 'es', text: 'Ver más' }] },
      {
        key: 'home.quote',
        values: [
          {
            language: 'es',
            text: '"La felicidad no es un objetivo, es una consecuencia"'
          }
        ]
      },
      {
        key: 'home.quote.message',
        values: [
          {
            language: 'es',
            text: 'Terapia cognitivo-conductual. Atención online.'
          }
        ]
      },
      { key: 'learnMore', values: [{ language: 'es', text: 'Conocer más' }] },
      {
        key: 'contact.title',
        values: [{ language: 'es', text: 'Contáctanos' }]
      },
      {
        key: 'contact.subtitle',
        values: [
          {
            language: 'es',
            text: 'Envíanos una consulta o bien reserva un turno.'
          }
        ]
      },
      { key: 'contact.send', values: [{ language: 'es', text: 'Enviar' }] },
      { key: 'contact.name', values: [{ language: 'es', text: 'Nombre' }] },
      {
        key: 'contact.message',
        values: [
          {
            language: 'es',
            text: 'Envíanos una consulta o bien reserva un turno.'
          }
        ]
      },
      {
        key: 'contact.comment',
        values: [{ language: 'es', text: 'Comentarios' }]
      },
      {
        key: 'contact.method',
        values: [{ language: 'es', text: 'Medio de contacto' }]
      }
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
