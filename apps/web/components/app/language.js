import React from 'react'
import Select from '@mui/material/Select'
import { useTranslation } from 'react-i18next'

const Language = ({ inputProps = {}, ...props }) => {
  const { i18n } = useTranslation()
  return (
    <Select
      native
      color="secondary"
      IconComponent={'div'}
      value={i18n.language}
      onChange={(e) => {
        const language = e.target.value
        if (i18n.language != language) i18n.changeLanguage(language)
      }}
      inputProps={{
        style: inputProps.style
          ? inputProps.style
          : { padding: '6px 3px 2px 7px', border: 'none' },
        name: 'language',
        id: 'language',
        ...inputProps
      }}
      {...props}
    >
      {(i18n.options.whitelist || [])
        .filter((language) => language !== 'cimode')
        .map((language) => (
          <option key={language} value={language}>
            {language.toUpperCase()}
          </option>
        ))}
    </Select>
  )
}

export default Language
