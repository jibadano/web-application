import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import config from 'common-lib/config'
import { ToggleButtonGroup, ToggleButton } from '@mui/material'
const TranslationField = ({ values }) => {
  let languages = config.get('settings.i18next.whitelist') || []
  languages = languages.filter((lng) => lng != 'cimode')

  const [language, setLanguage] = React.useState(languages[0])

  return (
    <Box display="flex">
      <Box flexGrow={1}>
        <Typography>{values[language]}</Typography>
      </Box>
      {Boolean(languages.length > 1) && (
        <ToggleButtonGroup
          size="small"
          value={language}
          exclusive
          onChange={(e, lang) => lang && setLanguage(lang)}
        >
          {languages.map((language) => (
            <ToggleButton value={language}>{language}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    </Box>
  )
}
export default TranslationField
