import { useTranslation as originalUseTranslation } from 'react-i18next'

export const useTranslation = () => {
  const { t, i18n, ...rest } = originalUseTranslation()

  return {
    t: (input, options) => {
      /* return (
        <div
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation()
            router.replace(
              { query: { ...router.query, translation: input } },
              null,
              {
                scroll: false
              }
            )
          }}
        >
          {t(input)}
        </div>
      ) */
      if (typeof input == 'object') return input[i18n.language] || ''
      return t(input, options)
    },
    i18n,
    ...rest
  }
}
