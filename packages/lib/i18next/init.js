import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import config from 'config/get'

const i18nextConfig = config.get('settings.i18next') || {
  fallbackLng: 'es',
  whitelist: ['es'],
  keySeparator: true, // we do not use keys in form messages.welcome
  interpolation: {
    escapeValue: false // react already safes from xss
  }
}

const translations = config.get('translations')
const resources = {}
translations.forEach(({ key, values }) =>
  values.forEach(({ language, text }) => {
    if (!resources[language]) resources[language] = { translation: {} }
    resources[language].translation[key] = text
  })
)
i18nextConfig.resources = resources

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(i18nextConfig)
i18n.languages = i18nextConfig.whitelist
i18n.language = i18n.language || i18nextConfig.fallbackLng

export default i18n
