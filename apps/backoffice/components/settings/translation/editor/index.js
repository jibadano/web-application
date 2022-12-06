import React from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'lib/i18next'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import LanguageIcon from '@mui/icons-material/LanguageOutlined'
import Loading from '@backoffice/components/common/card/skeleton'
import SideMenu from '@backoffice/components/common/sideMenu'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import TextField from 'form/textField'
import ListSubheader from '@mui/material/ListSubheader'
import Fade from '@mui/material/Fade'
import Translation from './item'

import { useSettings } from '../../hooks'

const Translations = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const [selected, setSelected] = React.useState()
  const [searchText, setSearchText] = React.useState(
    router.query.searchText || ''
  )

  const { settings, loading } = useSettings()

  if (loading || !settings) return <Loading />

  const languages = settings.i18next.whitelist
  const translations = settings.translations || []

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        style={{
          maxHeight: '80vh',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        <SideMenu title={t('backoffice.translations.list')}>
          <List>
            <ListSubheader style={{ borderRadius: 20 }} disableGutters>
              <Box p={2} style={{ borderRadius: 20, backgroundColor: 'white' }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={searchText}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setSearchText(e.target.value)}
                  label={t('backoffice.search')}
                ></TextField>
              </Box>
            </ListSubheader>
            {translations
              .filter(({ key }) => new RegExp(`.*${searchText}.*`).test(key))
              .map((translation) => {
                const missing = translation.values.some(
                  ({ text }) => !Boolean(text)
                )
                return (
                  <ListItem
                    key={translation.key}
                    button
                    selected={selected && translation.key == selected.key}
                    onClick={() => setSelected(translation)}
                  >
                    <ListItemText primary={translation.key} />

                    {missing && (
                      <ListItemSecondaryAction>
                        <Chip
                          label={t('backoffice.translations.untranslated')}
                        />
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                )
              })}
          </List>
        </SideMenu>
      </Box>
      <Box ml={2} display={{ xs: 'none', sm: 'block' }}>
        <Divider orientation="vertical" />
      </Box>
      <Box sx={{ width: '100%' }}>
        <Fade in={selected} unmountOnExit mountOnEnter>
          <div>
            <Translation
              key={selected && selected.key}
              onDone={(newTranslation) => setSelected(newTranslation)}
              translation={selected}
              languages={languages}
            />
          </div>
        </Fade>
        {!selected && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              minHeight: '50vh'
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              sx={{
                textAlign: 'center'
              }}
            >
              <LanguageIcon fontSize="medium" />
              <Typography color="textSecondary" variant="h5">
                {t('backoffice.translations.select')}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Translations
