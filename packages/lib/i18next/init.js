import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import localTranslations from '/translations.json'

export default (config, language) => {
  const i18nextConfig = config.get('..settings.i18next') || {
    fallbackLng: 'es',
    whitelist: ['es', 'en'],
    keySeparator: true, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  }

  const translations = config.get('..settings.translations')

  const resources = {}
  translations.forEach(({ key, values }) =>
    values.forEach(({ language, text }) => {
      if (!resources[language]) resources[language] = { translation: {} }
      resources[language].translation[key] = text
    })
  )

  for (const language in localTranslations) {
    if (!resources[language]) resources[language] = { translation: {} }

    resources[language].translation = {
      ...resources[language].translation,
      ...localTranslations[language]
    }
  }

  i18nextConfig.resources = resources

  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init(i18nextConfig)
  i18n.languages = i18nextConfig.whitelist
  i18n.language = i18n.language || i18nextConfig.fallbackLng
  if (language) i18n.changeLanguage(language)
  return i18n
}
