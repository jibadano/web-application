import React from 'react'
import get from 'lodash/get'
import TextField from '@mui/material/TextField'
import config from 'config/get'
import { ToggleButtonGroup, ToggleButton } from '@mui/material'
const TranslationField = ({
  key,
  id,
  children,
  handleChange,
  multi,
  ...props
}) => {
  let languages = config.get('settings.i18next.whitelist') || []
  languages = languages.filter((lng) => lng != 'cimode')
  const [language, setLanguage] = React.useState(languages[0])
  let values = get(props, `values.${id}`) || {}

  return (
    <TextField
      {...props}
      variant="outlined"
      size="large"
      fullWidth
      multiline={multi}
      InputProps={{
        endAdornment: Boolean(languages.length > 1) && (
          <ToggleButtonGroup
            size="small"
            value={language}
            exclusive
            onChange={(e, lang) => setLanguage(lang)}
          >
            {languages.map((language) => (
              <ToggleButton value={language}>{language}</ToggleButton>
            ))}
          </ToggleButtonGroup>
        )
      }}
      value={values[language]}
      label={`${children} (${language})`}
      onChange={(e) => {
        const newValues = { ...values }
        newValues[language] = e.target.value

        handleChange({ target: { id, value: newValues } })
      }}
    />
  )
}
export default TranslationField
