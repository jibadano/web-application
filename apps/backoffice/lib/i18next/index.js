import { useTranslation as originalUseTranslation } from 'react-i18next'

export const useTranslation = () => {
  const { t, i18n, ...rest } = originalUseTranslation()

  return {
    t: (input, options) => {
      if (typeof input == 'object') return input[i18n.language] || ''
      return t(input, options)
    },
    i18n,
    ...rest
  }
}
